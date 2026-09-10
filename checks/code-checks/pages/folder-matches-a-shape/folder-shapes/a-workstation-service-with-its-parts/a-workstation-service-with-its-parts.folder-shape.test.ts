import { expect, test } from "bun:test"
import { folderFrom } from "../../folder-matches-a-shape.code-check.decision.test-fixtures.ts"
import { aWorkstationServiceWithItsParts } from "./a-workstation-service-with-its-parts.folder-shape.code.ts"

const FOLDER = "akasha/pages/service/workstation-services"

const PAGE_TYPES = new Set<string>(["workstation-service", "module"])

const ONE = ["pages-service.workstation-service.ts"]

function judged(names: readonly string[], deep: readonly string[] = []): readonly string[] {
  const made = folderFrom({ folder: FOLDER, pageTypes: PAGE_TYPES, deep })
  return aWorkstationServiceWithItsParts(made(names))
}

test("a folder named workstation-services holding one service takes the shape", () => {
  expect(judged(ONE)).toEqual([])
})

test("a folder holding no page of its own is refused", () => {
  expect(judged([])).toEqual(["it holds no page of its own"])
})

test("a folder holding two services is refused, and the reason counts them", () => {
  const said = judged([...ONE, "other-service.workstation-service.ts"])
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("2 pages")
})

test("a page of another type is refused, and the reason names both types", () => {
  const said = judged(["notes.module.ts"])
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("`module`")
  expect(said[0]).toContain("`workstation-service`")
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
