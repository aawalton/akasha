import { expect, test } from "bun:test"
import { folderFrom } from "akasha/checks/code-checks/pages/folder-matches-a-shape/folder-matches-a-shape.code-check.decision.test-fixtures.ts"
import { aClaimedFolder } from "akasha/checks/code-checks/pages/folder-matches-a-shape/folder-shapes/a-claimed-folder/a-claimed-folder.folder-shape.code.ts"

const FOLDER = "akasha/one/addons/an-addon/bytes"

const PAGE_TYPES = new Set<string>(["module"])

function judged(
  names: readonly string[],
  claimed: boolean,
  deep: readonly string[] = []
): readonly string[] {
  const made = folderFrom({
    folder: FOLDER,
    pageTypes: PAGE_TYPES,
    claimed: () => claimed,
    deep,
  })
  return aClaimedFolder(made(names))
}

test("a claimed folder of bytes takes the shape", () => {
  expect(judged(["one.dds", "two.dds"], true)).toEqual([])
})

test("a claimed folder holding only a subfolder of bytes takes the shape", () => {
  expect(judged([], true, ["textures/one.dds"])).toEqual([])
})

test("a folder no page above claims is refused", () => {
  const said = judged(["one.dds"], false)
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("claims")
})

test("a claimed folder holding a page is refused, and the reason names it", () => {
  const said = judged(["one.dds", "held.module.ts"], true)
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("held.module.ts")
})

test("a claimed folder holding a file a page names is refused", () => {
  const said = judged(["held.module.code.ts"], true)
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("held.module.code.ts")
})

test("a claimed folder holding neither a file nor a folder is refused", () => {
  const said = judged([], true)
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("nothing")
})
