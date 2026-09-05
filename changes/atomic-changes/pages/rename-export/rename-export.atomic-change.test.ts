import { afterAll, expect, test } from "bun:test"
import { scratchWorld } from "../../../../command-system/scratching/scratching.module.code.ts"
import { renameExport } from "./rename-export.atomic-change.code.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

const CODE = "akasha/one/held/held.module.code.ts"

const NOTHING = (): null => null

function whyOf(at: string, of: string, to: string): string {
  const said = renameExport(scratch.rootFor("rename-export-"), { at, of, to }, NOTHING)
  expect(said.bodies).toBe(null)
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
