import { expect, test } from "bun:test"
import { namesToldIn } from "akasha/check/code/pages/no-unused-exports/modules/export-telling/export-telling.module.code.ts"

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
