import { expect, test } from "bun:test"
import { foundIn } from "akasha/check/code/pages/no-method-signature/no-method-signature.check-code.decision.code.ts"
import {
  AT,
  SIGNED,
} from "akasha/check/code/pages/no-method-signature/no-method-signature.check-code.decision.test-fixtures.ts"

test("a property holding a function type is let through", () => {
  const body = "type Whole = {\n  readonly at: (path: string) => string | null\n}\n"
  expect(foundIn(AT, body)).toEqual([])
})

test("a method signature in a type literal is refused, and names the line and the member", () => {
  const body = "type Whole = {\n  at(path: string): string\n}\n"
  const said = foundIn(AT, body)
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("line 2")
  expect(said[0]).toContain("`at` as a method signature")
})

test("a method signature in an interface is refused the same as one in a type literal", () => {
  const body = "interface Whole {\n  at(path: string): string\n}\n"
  expect(foundIn(AT, body)).toHaveLength(1)
})

test("no call, construct or index signature is judged", () => {
  const body = [
    "interface Whole {",
    "  (one: string): number",
    "  new (one: string): Whole",
    "  [named: string]: unknown",
    "}",
  ].join("\n")
  expect(foundIn(AT, `${body}\n`)).toEqual([])
})

test("a method written on an object literal is not a signature", () => {
  const body = "const one = {\n  at(path: string) {\n    return path\n  },\n}\n"
  expect(foundIn(AT, body)).toEqual([])
})

test("a method written on a class is not a signature", () => {
  const body = "class Held extends Error {\n  at(path: string) {\n    return path\n  }\n}\n"
  expect(foundIn(AT, body)).toEqual([])
})

test("every method signature a file writes is reported, however deeply the type is nested", () => {
  const body = ["type One = {", "  a(): void", "  b: {", "    c(): void", "  }", "}"].join("\n")
  expect(foundIn(AT, `${body}\n`)).toHaveLength(2)
})

test("a method signature named by a computed key or a string is still named in the reason", () => {
  const said = foundIn(AT, 'type One = {\n  "at one"(): void\n}\n')
  expect(said).toHaveLength(1)
  expect(said[0]).toContain('"at one"')
})

test("an optional method signature is a method signature", () => {
  expect(foundIn(AT, "type One = {\n  a?(): void\n}\n")).toHaveLength(1)
})

test("a method signature in a type literal that is a parameter type is judged", () => {
  const body = "export function one(two: { a(): void }): void {\n  two.a()\n}\n"
  expect(foundIn(AT, body)).toHaveLength(1)
})

test("a declaration file is passed over, however many method signatures that file writes", () => {
  expect(foundIn("akasha/held.d.ts", SIGNED)).toEqual([])
  expect(foundIn(AT, SIGNED)).toHaveLength(1)
})
