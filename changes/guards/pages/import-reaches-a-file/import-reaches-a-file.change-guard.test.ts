import { afterAll, expect, test } from "bun:test"
import { dirname, join } from "node:path"
import { HELD_CODE, indexedRepo, scratch, textIn } from "@akasha/indexes/indexing/testing"
import { stating } from "../../../modules/change-answer/change-answer.module.code.ts"
import type { Answer } from "../../../modules/change-answer/change-answer.module.types.ts"
import { worldAt } from "../../../modules/change-shadow/change-shadow.module.code.ts"
import { guardedBy } from "../../../modules/guarding/change-guarding.module.code.ts"
import {
  importReachesAFile,
  rerootedIn,
  rootDirsIn,
} from "./import-reaches-a-file.change-guard.code.ts"

afterAll(scratch.sweep)

const GUARDS = [importReachesAFile]

const AT = join(dirname(HELD_CODE), "fresh.module.code.ts")

const MADE = join(dirname(HELD_CODE), "made.module.code.ts")

const CONFIG = "akasha/tsconfig.json"

const ROOTED = "akasha/gen/one/made.ts"

const ROOTS = '{ "compilerOptions": { "rootDirs": [".", "./gen"] } }\n'

function judged(root: string, said: Answer): Answer {
  return guardedBy(worldAt(root, textIn(root)), said, GUARDS)
}

function rooted(): string {
  return indexedRepo({ [CONFIG]: ROOTS, [ROOTED]: "export const made = 1\n" })
}

test("a code body naming an import that reaches no file is refused", () => {
  const root = indexedRepo()
  const body = 'import { gone } from "./gone.module.code.ts"\n\nexport const fresh = gone\n'

  const said = judged(root, stating([{ kind: "add", path: AT, content: body }]))

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toContain("holds no body")
})

test("a code body naming an import that reaches a file is not refused", () => {
  const root = indexedRepo()
  const body = 'import { held } from "./held.module.code.ts"\n\nexport const fresh = held\n'

  const said = judged(root, stating([{ kind: "add", path: AT, content: body }]))

  expect(said.refused).toBe(null)
})

test("a body under no TypeScript name is judged by nothing", () => {
  const root = indexedRepo()
  const notes = join(dirname(HELD_CODE), "notes.md")

  const said = judged(
    root,
    stating([{ kind: "add", path: notes, content: "see ./gone.module.code.ts\n" }])
  )

  expect(said.refused).toBe(null)
})

test("a code body naming an import the same answer writes is not refused", () => {
  const root = indexedRepo()
  const body = 'import { made } from "./made.module.code.ts"\n\nexport const fresh = made\n'

  const said = judged(
    root,
    stating([
      { kind: "add", path: MADE, content: "export const made = 1\n" },
      { kind: "add", path: AT, content: body },
    ])
  )

  expect(said.refused).toBe(null)
})

test("a specifier naming a package is not refused", () => {
  const root = indexedRepo()
  const body = 'import { join } from "node:path"\n\nexport const fresh = join\n'

  const said = judged(root, stating([{ kind: "add", path: AT, content: body }]))

  expect(said.refused).toBe(null)
})

test("a root is resolved against the folder its tsconfig is in", () => {
  expect(rootDirsIn(ROOTS, "alan/atlas-web")).toEqual(["alan/atlas-web", "alan/atlas-web/gen"])
  expect(rootDirsIn(ROOTS, ".")).toEqual(["", "gen"])
})

test("a tsconfig that will not parse names no root", () => {
  expect(rootDirsIn("{", "alan/atlas-web")).toEqual([])
  expect(rootDirsIn('{ "compilerOptions": {} }', "alan/atlas-web")).toEqual([])
})

test("what is left of a landing is looked for under each of the other roots", () => {
  const roots = ["alan/atlas-web", "alan/atlas-web/.react-router/types"]

  expect(rerootedIn("alan/atlas-web/routes/+types/api.page-write", roots)).toEqual([
    "alan/atlas-web/.react-router/types/routes/+types/api.page-write",
  ])
})

test("the longest root the landing is under is the root taken off", () => {
  expect(rerootedIn("gen/one/two.ts", ["gen", "gen/one", ""])).toEqual(["gen/two.ts", "two.ts"])
})

test("a landing under no root is looked for nowhere else", () => {
  expect(rerootedIn("alan/web/routes/one.ts", ["alan/atlas-web"])).toEqual([])
})

test("an import reaching a file under another root is not refused", () => {
  const body = 'import { made } from "./made"\n\nexport const fresh = made\n'

  const said = judged(rooted(), stating([{ kind: "add", path: AT, content: body }]))

  expect(said.refused).toBe(null)
})

test("an import reaching no file under any root is refused", () => {
  const body = 'import { gone } from "./gone"\n\nexport const fresh = gone\n'

  const said = judged(rooted(), stating([{ kind: "add", path: AT, content: body }]))

  expect(said.refused).toBe(`\`${AT}\` imports \`./gone\`, and \`akasha/one/gone\` holds no body`)
})

test("a landing carrying no extension is looked for under `.ts`", () => {
  const root = indexedRepo()
  const body = 'import { kept } from "./held.module.code"\n\nexport const fresh = kept\n'

  const said = judged(root, stating([{ kind: "add", path: AT, content: body }]))

  expect(said.refused).toBe(null)
})
