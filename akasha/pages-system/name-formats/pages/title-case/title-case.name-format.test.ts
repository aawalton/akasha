import { expect, test } from "bun:test"
import { titleCase } from "./title-case.name-format.code.ts"

test("words parted by spaces with every one starting capital are written in it", () => {
  expect(titleCase("Name")).toBe(true)
  expect(titleCase("Name Format")).toBe(true)
  expect(titleCase("Same Words Everywhere")).toBe(true)
})

test("a word between the first and the last may open lower, being perhaps unimportant", () => {
  expect(titleCase("The Words of a Name")).toBe(true)
})

test("the first word opening lower is refused", () => {
  expect(titleCase("name Format")).toBe(false)
})

test("the last word opening lower is refused", () => {
  expect(titleCase("Name Format of")).toBe(false)
})

test("one space parts two words, and nothing pads the name", () => {
  expect(titleCase("")).toBe(false)
  expect(titleCase("Name  Format")).toBe(false)
  expect(titleCase(" Name")).toBe(false)
  expect(titleCase("Name ")).toBe(false)
})
