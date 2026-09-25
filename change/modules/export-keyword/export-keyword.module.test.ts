import { expect, test } from "bun:test"
import {
  droppableIn,
  droppedIn,
} from "akasha/change/modules/export-keyword/export-keyword.module.code.ts"

const AT = "akasha/held.module.code.ts"

const TEXT = "export const held = 1\nexport const spare = 2\n"

test("a statement declaring a name asked for is reached", () => {
  expect(droppableIn(AT, TEXT, ["spare"])).toEqual(["spare"])
})

test("a statement declaring two names is passed over where only one is asked for", () => {
  expect(droppableIn(AT, "export const held = 1,\n  spare = 2\n", ["held"])).toEqual([])
})

test("a function and a class each declare the one name", () => {
  expect(droppableIn(AT, "export function held(): number {\n  return 1\n}\n", ["held"])).toEqual([
    "held",
  ])
  expect(droppableIn(AT, "export class Held extends Error {}\n", ["Held"])).toEqual(["Held"])
})

test("a type and an interface each declare the one name", () => {
  expect(droppableIn(AT, "export type Held = number\n", ["Held"])).toEqual(["Held"])
  expect(droppableIn(AT, "export interface Held {\n  one: number\n}\n", ["Held"])).toEqual(["Held"])
})

test("a statement declaring no name at all is passed over", () => {
  expect(droppableIn(AT, "export enum Held {\n  One,\n}\n", ["Held"])).toEqual([])
})

test("the passage answered runs from the keyword past the spaces after it", () => {
  const held = droppedIn(AT, TEXT, new Set(["held"]))
  expect(held.splices).toEqual([{ from: 0, to: "export ".length, put: "" }])
})

test("a body with no keyword answers nothing", () => {
  expect(droppedIn(AT, "const held = 1\n", new Set(["held"])).splices).toEqual([])
})
