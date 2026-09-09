import { afterAll, expect, test } from "bun:test"
import { dirname, join } from "node:path"
import { HELD_CODE, indexedRepo, scratch, textIn } from "@akasha/indexes/indexing/testing"
import { stating } from "../../../modules/change-answer/change-answer.module.code.ts"
import type { Answer } from "../../../modules/change-answer/change-answer.module.types.ts"
import { worldAt } from "../../../modules/change-shadow/change-shadow.module.code.ts"
import { guardedBy } from "../../../modules/guarding/change-guarding.module.code.ts"
import { importReachesAFile } from "./import-reaches-a-file.change-guard.code.ts"

afterAll(scratch.sweep)

const GUARDS = [importReachesAFile]

const AT = join(dirname(HELD_CODE), "fresh.module.code.ts")

const MADE = join(dirname(HELD_CODE), "made.module.code.ts")

function judged(root: string, said: Answer): Answer {
  return guardedBy(worldAt(root, textIn(root)), said, GUARDS)
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
