import { expect, test } from "bun:test"
import { startCase } from "./start-case.name-format.code.ts"

test("words parted by spaces with every one starting capital are written in it", () => {
  expect(startCase("Name")).toBe(true)
  expect(startCase("Name Format")).toBe(true)
  expect(startCase("Same Words Everywhere")).toBe(true)
  expect(startCase("Zero At Turning On")).toBe(true)
})

test("a word opening lower is refused wherever it stands", () => {
  expect(startCase("The Words of a Name")).toBe(false)
  expect(startCase("Every changed Line")).toBe(false)
  expect(startCase("The index is Akasha")).toBe(false)
})

test("the first word opening lower is refused", () => {
  expect(startCase("name Format")).toBe(false)
})

test("the last word opening lower is refused", () => {
  expect(startCase("Name Format of")).toBe(false)
})

test("one space parts two words, and nothing pads the name", () => {
  expect(startCase("")).toBe(false)
  expect(startCase("Name  Format")).toBe(false)
  expect(startCase(" Name")).toBe(false)
  expect(startCase("Name ")).toBe(false)
})
