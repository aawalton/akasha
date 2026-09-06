import { afterAll, expect, test } from "bun:test"
import {
  HELD_CODE,
  HELD_EXPORT,
  indexedRepo,
  NAMER_CODE,
  scratch,
  textIn,
} from "@akasha/indexes/indexing/testing"
import type { Answer } from "../../modules/change-answer/change-answer.module.types.ts"
import { worldAt } from "../../modules/change-shadow/change-shadow.module.code.ts"
import { renameExport } from "./rename-export.change-mechanical.code.ts"

afterAll(scratch.sweep)

const CODE = "akasha/one/held/held.module.code.ts"

const NOTHING = (): null => null

const CARRIED = "carried"

function pathsOf(said: Answer): readonly string[] {
  return said.edits.map((one) => one.path).sort()
}

function bodyIn(said: Answer, path: string): string | null | undefined {
  return said.edits.find((one) => one.path === path)?.body
}

function whyOf(at: string, of: string, to: string): string {
  const world = worldAt(scratch.rootFor("rename-export-"), NOTHING)
  const said = renameExport(world, { at, of, to })
  expect(said.edits).toEqual([])
  return said.refused ?? ""
}

test("a path that is no TypeScript body is refused", () => {
  expect(whyOf("akasha/one/held/held.md", "one", "two")).toBe(
    "`akasha/one/held/held.md` names no TypeScript body"
  )
})

test("a page is refused, since a page's export is its slug", () => {
  expect(whyOf("akasha/one/held/held.module.ts", "held", "kept")).toBe(
    "`akasha/one/held/held.module.ts` is a page, and a page's export is its slug"
  )
})

test("a test file beside a page is renamed as its code is", () => {
  expect(whyOf("akasha/one/held/held.module.test.ts", "one", "two")).not.toContain("is a page")
})

test("a name no body could carry is refused", () => {
  expect(whyOf(CODE, "one", "2two")).toBe("`2two` is no name a body carries")
  expect(whyOf(CODE, "1one", "two")).toBe("`1one` is no name a body carries")
})

test("the name it already carries is refused", () => {
  expect(whyOf(CODE, "one", "one")).toBe("`one` is the name it already carries")
})

test("an index that cannot answer refuses rather than narrowing the reach", () => {
  const said = whyOf(CODE, "one", "two")
  expect(said).toContain("so none were repointed")
})

test("the declaring file and the file importing it are both spelled anew", () => {
  const root = indexedRepo()
  const world = worldAt(root, textIn(root))
  const said = renameExport(world, { at: HELD_CODE, of: HELD_EXPORT, to: CARRIED })
  expect(said.refused).toBe(null)
  expect(pathsOf(said)).toEqual([HELD_CODE, NAMER_CODE])
  expect(bodyIn(said, HELD_CODE)).toBe(`export const ${CARRIED} = 1\n`)
  expect(bodyIn(said, NAMER_CODE)).toBe(
    `import { ${CARRIED} } from "../one/held.module.code.ts"\n\nexport const named = ${CARRIED} + 1\n`
  )
})

test("the bodies are answered rather than written", () => {
  const root = indexedRepo()
  const text = textIn(root)
  const said = renameExport(worldAt(root, text), { at: HELD_CODE, of: HELD_EXPORT, to: CARRIED })
  expect(said.refused).toBe(null)
  expect(text(HELD_CODE)).toBe(`export const ${HELD_EXPORT} = 1\n`)
  expect(text(NAMER_CODE)).toContain(`import { ${HELD_EXPORT} }`)
})

test("a rename refuses where a file it would change already reaches the new name", () => {
  const root = indexedRepo()
  const world = worldAt(root, textIn(root))
  const said = renameExport(world, { at: HELD_CODE, of: HELD_EXPORT, to: "named" })
  expect(said.edits).toEqual([])
  expect(said.refused).toBe(`\`${NAMER_CODE}\` already reaches a \`named\``)
})
