import { expect, test } from "bun:test"
import type { Standing } from "../folder-shape.page-type.ts"
import { singleEntrance } from "./single-entrance.folder-shape.code.ts"

const FOLDER = "akasha/one"

function standing(
  files: readonly string[],
  deep: readonly string[],
  entered: readonly string[]
): Standing {
  return {
    folder: FOLDER,
    files,
    deep,
    pages: [],
    properties: [],
    strays: [],
    entered: (one) => entered.includes(one),
    extending: () => false,
  }
}

const DOOR = `${FOLDER}/door.ts`

const HELD = `${FOLDER}/held.ts`

const DEEP = `${FOLDER}/under/deep.ts`

test("one file entered from outside and nothing beneath takes the shape", () => {
  expect(singleEntrance(standing([DOOR, HELD], [DEEP], [DOOR]))).toEqual([])
})

test("a folder holding no code file at all takes the shape rather than failing it", () => {
  expect(singleEntrance(standing([], [], []))).toEqual([])
})

test("two files entered from outside fail, and the reason names them relative to the folder", () => {
  const said = singleEntrance(standing([DOOR, HELD], [], [DOOR, HELD]))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("2 files sitting in it")
  expect(said[0]).toContain("door.ts, held.ts")
})

test("a file under a subfolder entered from outside is a second door", () => {
  const said = singleEntrance(standing([DOOR], [DEEP], [DOOR, DEEP]))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("under its subfolders")
  expect(said[0]).toContain("under/deep.ts")
})

test("code files nothing outside imports fail as one reason naming the count", () => {
  expect(singleEntrance(standing([DOOR, HELD], [DEEP], []))).toEqual([
    "nothing outside it imports any of its 3 code files",
  ])
})

test("no door here and one beneath is said as both, so neither is hidden by the other", () => {
  const said = singleEntrance(standing([DOOR], [DEEP], [DEEP]))
  expect(said).toHaveLength(2)
  expect(said[0]).toContain("no file sitting in it")
  expect(said[1]).toContain("under its subfolders")
})

test("a declaration file is no door, so a folder entered only through one is entered nowhere", () => {
  const declaration = `${FOLDER}/one.d.ts`
  expect(singleEntrance(standing([DOOR, declaration], [], [DOOR, declaration]))).toEqual([])
})

test("a folder holding only declaration files takes the shape, holding no code to be entered", () => {
  expect(singleEntrance(standing([`${FOLDER}/one.d.ts`], [], []))).toEqual([])
})
