import { expect, test } from "bun:test"
import { folderFrom } from "../../folder-matches-a-shape.code-check.test-fixtures.ts"
import type { Standing } from "../../folder-shapes/folder-shape.page-type.ts"
import { judgedBy, namesHeldBy, type Shape } from "./shape-loading.module.code.ts"

function standingAt(folder: string): Standing {
  return folderFrom({ folder, pageTypes: new Set<string>() })([])
}

const TAKING: Shape = { slug: "modules-only", judge: () => [], holds: "modules" }

const ANY: Shape = { slug: "the-workspace-root", judge: () => [], holds: null }

test("a shape is handed a folder of the name that shape publishes", () => {
  expect(judgedBy(TAKING, standingAt("akasha/foo/modules"))).toEqual([])
})

test("a folder of another name is declined with a reason rather than matched", () => {
  const said = judgedBy(TAKING, standingAt("akasha/foo/other"))
  expect(said).toHaveLength(1)
  expect(said[0]).toBe("it is named `other` rather than `modules`")
})

test("a shape publishing no name is handed every folder", () => {
  expect(judgedBy(ANY, standingAt("akasha/foo/other"))).toEqual([])
})

test("the names held are the names the shapes publish", () => {
  expect([...namesHeldBy([TAKING, ANY])]).toEqual(["modules"])
})
