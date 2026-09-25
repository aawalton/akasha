import { expect, test } from "bun:test"
import {
  namesToldIn,
  typesNamedWithin,
  typesToldIn,
} from "akasha/check/code/pages/no-unused-exports/modules/export-telling/export-telling.module.code.ts"

const AT = "akasha/held.module.code.ts"

test("the values a file exports are told apart by name", () => {
  expect(namesToldIn(AT, "export const held = 1\nexport const spare = 2\n")).toEqual([
    "held",
    "spare",
  ])
})

test("a name a file exports more than once is told once", () => {
  const text =
    "export function held(one: string): string\n" +
    "export function held(one: number): number\n" +
    "export function held(one: string | number): string | number {\n" +
    "  return one\n" +
    "}\n"

  expect(namesToldIn(AT, text)).toEqual(["held"])
})

test("a file exporting every name of another file tells no name apart", () => {
  expect(namesToldIn(AT, 'export * from "akasha/one.module.code.ts"\n')).toBeNull()
})

test("a file exporting a list of its own values tells no name apart", () => {
  expect(namesToldIn(AT, "const held = 1\n\nexport { held }\n")).toBeNull()
})

test("the types a file exports are told apart by name", () => {
  const text = "export type Held = number\n\nexport interface Spare {\n  one: number\n}\n"

  expect(namesToldIn(AT, text)).toEqual(["Held", "Spare"])
})

test("a type listed for export alone is told by the name it is exported as", () => {
  expect(namesToldIn(AT, "type Held = number\n\nexport type { Held as Spare }\n")).toEqual([
    "Spare",
  ])
})

test("a value exported as the default is told as the default", () => {
  expect(namesToldIn(AT, "export default function held(): number {\n  return 1\n}\n")).toEqual([
    "default",
  ])
  expect(namesToldIn(AT, "const held = 1\n\nexport default held\n")).toEqual(["default"])
})

test("a name exported only as a type is told as a type", () => {
  const text =
    "const Held = 1\n\nexport type Held = typeof Held\n\n" +
    "export const spare = 2\n\nexport type Spare = number\n\nexport interface Kept {}\n"

  expect([...typesToldIn(AT, text)]).toEqual(["Held", "Spare", "Kept"])
})

test("a name exported as a value and as a type is told as no type", () => {
  const text = "export const Held = 1\n\nexport type Held = typeof Held\n"

  expect(typesToldIn(AT, text).size).toBe(0)
})

test("a type is named where a type names it rather than where a value of its name is", () => {
  const text =
    "const Held = 1\n\ntype Held = typeof Held\n\nconst spare: Spare = Held\n\n" +
    "interface Kept extends Base {}\n"

  expect([...typesNamedWithin(AT, text)].sort()).toEqual(["Base", "Spare"])
})

test("a type naming itself is not named by that", () => {
  const text = "type Held = number | readonly Held[]\n\ntype Spare = Held\n"

  expect([...typesNamedWithin(AT, text)]).toEqual(["Held"])
})
