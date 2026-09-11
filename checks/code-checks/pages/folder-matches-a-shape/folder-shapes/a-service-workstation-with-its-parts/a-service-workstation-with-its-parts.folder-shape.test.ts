import { expect, test } from "bun:test"
import { folderFrom } from "akasha/checks/code-checks/pages/folder-matches-a-shape/folder-matches-a-shape.code-check.decision.test-fixtures.ts"
import { aServiceWorkstationWithItsParts } from "akasha/checks/code-checks/pages/folder-matches-a-shape/folder-shapes/a-service-workstation-with-its-parts/a-service-workstation-with-its-parts.folder-shape.code.ts"

const FOLDER = "akasha/pages/service/service-workstations"

const PAGE_TYPES = new Set<string>(["service-workstation", "module"])

const ONE = ["pages-service.service-workstation.ts"]

function judged(names: readonly string[], deep: readonly string[] = []): readonly string[] {
  const made = folderFrom({ folder: FOLDER, pageTypes: PAGE_TYPES, deep })
  return aServiceWorkstationWithItsParts(made(names))
}

test("a folder named service-workstations holding one service takes the shape", () => {
  expect(judged(ONE)).toEqual([])
})

test("a folder holding no page of its own is refused", () => {
  expect(judged([])).toEqual(["it holds no page of its own"])
})

test("a folder holding two services is refused, and the reason counts them", () => {
  const said = judged([...ONE, "other-service.service-workstation.ts"])
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("2 pages")
})

test("a page of another type is refused, and the reason names both types", () => {
  const said = judged(["notes.module.ts"])
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("`module`")
  expect(said[0]).toContain("`service-workstation`")
})

test("a file that is no part of the service is refused, and the reason names it", () => {
  const said = judged([...ONE, "loose.txt"])
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("loose.txt")
})

test("a subfolder is refused, and the reason names it", () => {
  const said = judged(ONE, ["held/held.module.ts"])
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("held")
})
