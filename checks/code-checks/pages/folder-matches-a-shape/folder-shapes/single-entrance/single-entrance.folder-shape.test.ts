import { expect, test } from "bun:test"
import { folderFrom } from "../../folder-matches-a-shape.code-check.test-fixtures.ts"
import type { Standing } from "../folder-shape.page-type.ts"
import { singleEntrance } from "./single-entrance.folder-shape.code.ts"

const FOLDER = "akasha/one"

const folder = folderFrom({ folder: FOLDER, pageTypes: new Set<string>(["module"]) })

function reached(names: readonly string[], entered: readonly string[]): Standing {
  const inside = new Set(entered.map((each) => `${FOLDER}/${each}`))
  return { ...folder(names), entered: (path: string) => inside.has(path) }
}

test("a folder no import reaches takes the shape", () => {
  expect(singleEntrance(reached(["one.module.ts", "one.module.code.ts"], []))).toEqual([])
})

test("a folder reached at one file takes the shape", () => {
  expect(
    singleEntrance(reached(["one.module.ts", "one.module.code.ts"], ["one.module.code.ts"]))
  ).toEqual([])
})

test("a folder reached at two files fails the shape", () => {
  const said = singleEntrance(
    reached(
      ["one.module.code.ts", "two.module.code.ts"],
      ["one.module.code.ts", "two.module.code.ts"]
    )
  )
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("2 files")
})

test("a type declaration reached from outside is no entrance", () => {
  expect(
    singleEntrance(
      reached(["one.module.code.ts", "shape.d.ts"], ["one.module.code.ts", "shape.d.ts"])
    )
  ).toEqual([])
})
