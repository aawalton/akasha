import { expect, test } from "bun:test"
import { NOTHING_OVER, type World } from "../../modules/change-shadow/change-shadow.module.code.ts"
import { changeFile } from "./change-file.change-mechanical.code.ts"

const AT = "akasha/one.held.ts"

function worldOf(held: Readonly<Record<string, string>>): World {
  return {
    root: "/nowhere",
    index: {} as World["index"],
    textOf: (path) => held[path] ?? null,
    over: NOTHING_OVER,
  }
}

test("a passage the body holds once is answered as one edit holding the body after", () => {
  const said = changeFile(worldOf({ [AT]: "one two three\n" }), {
    at: AT,
    old: "two",
    new: "four",
  })

  expect(said.refused).toBeNull()
  expect(said.edits).toEqual([{ path: AT, was: "one two three\n", body: "one four three\n" }])
})

test("a passage the body holds twice is refused and answers no edit", () => {
  const said = changeFile(worldOf({ [AT]: "two and two\n" }), { at: AT, old: "two", new: "four" })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toMatch(/twice or more/)
})

test("a passage the body holds nowhere is refused and answers no edit", () => {
  const said = changeFile(worldOf({ [AT]: "one\n" }), { at: AT, old: "two", new: "four" })

  expect(said.refused ?? "").toMatch(/holds no such passage/)
})

test("a path holding no body is refused and answers no edit", () => {
  const said = changeFile(worldOf({}), { at: AT, old: "two", new: "four" })

  expect(said.refused ?? "").toMatch(/holds no body/)
})

test("a passage of no characters is refused and answers no edit", () => {
  const said = changeFile(worldOf({ [AT]: "one\n" }), { at: AT, old: "", new: "four" })

  expect(said.refused ?? "").toMatch(/no characters/)
})

test("a passage replaced by itself is refused and answers no edit", () => {
  const said = changeFile(worldOf({ [AT]: "one two\n" }), { at: AT, old: "two", new: "two" })

  expect(said.refused ?? "").toMatch(/reads the same/)
})
