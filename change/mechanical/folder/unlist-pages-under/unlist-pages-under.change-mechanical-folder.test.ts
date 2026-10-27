import { afterAll, expect, test } from "bun:test"
import {
  runChange,
  unlisted,
} from "akasha/change/mechanical/folder/unlist-pages-under/unlist-pages-under.change-mechanical-folder.code.ts"
import { pathsIn } from "akasha/change/modules/answer/change-answer.module.code.ts"
import {
  bodiesIn,
  type World,
  worldAt,
} from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import { running } from "akasha/change/runner/pages/test-change-running/test-change-running.change-runner.code.ts"
import {
  HELD_PAGE,
  indexedRepo,
  NAMER_PAGE,
  pageOf,
  scratch,
  textIn,
} from "akasha/page/index/test-fixtures/fixture-world/fixture-world.test-fixture.code.ts"

afterAll(scratch.sweep)

const FOLDER = "akasha/one"

function worldIn(root: string): World {
  return worldAt(root, textIn(root), running)
}

test("a list outside the folder loses the name of a page under it", () => {
  const root = indexedRepo()
  const said = runChange(worldIn(root), { at: FOLDER })
  expect(said.refused).toBeNull()
  expect(pathsIn(said)).toEqual([NAMER_PAGE])
  const left = bodiesIn(said, textIn(root)).get(NAMER_PAGE) ?? ""
  expect(left).not.toContain('"module/held"')
})

test("a name stated alone rather than in a list is left", () => {
  const root = indexedRepo()
  const left = bodiesIn(runChange(worldIn(root), { at: FOLDER }), textIn(root)).get(NAMER_PAGE)
  expect(left ?? "").toContain('"note": "held"')
})

test("no page under the folder is written", () => {
  expect(pathsIn(runChange(worldIn(indexedRepo()), { at: FOLDER }))).not.toContain(HELD_PAGE)
})

test("a folder holding no page is refused", () => {
  expect(runChange(worldIn(indexedRepo()), { at: "akasha/nine" }).refused).not.toBeNull()
})

test("a name goes from a page's own list and from a list in a record of one", () => {
  const body = pageOf({
    slug: "some",
    parts: ["kind/gone", "kind/kept"],
    facts: [{ fact: "a fact", knowers: ["kind/kept", "kind/gone"] }],
  })
  const left = unlisted("some.kind.ts", body, new Set(["kind/gone"]))
  expect(left).not.toContain("kind/gone")
  expect(left.split("kind/kept").length).toBe(3)
})
