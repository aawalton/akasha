import { expect, test } from "bun:test"
import { reasonsIn } from "./no-method-signature.check.code.ts"

const ROOT = "/repo"

function given(at: string, body: string) {
  return { root: ROOT, path: at, bytes: new TextEncoder().encode(body) }
}

test("a property holding a function type is let through", () => {
  const body = "type Whole = {\n  readonly at: (path: string) => string | null\n}\n"
  expect(reasonsIn(given("akasha/held.ts", body))).toEqual([])
})

test("a method signature in a type literal is refused, and the reason names the line and the member", () => {
  const body = "type Whole = {\n  at(path: string): string\n}\n"
  const said = reasonsIn(given("akasha/held.ts", body))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("line 2")
  expect(said[0]).toContain("`at` as a method signature")
})

test("a method signature in an interface is refused the same as one in a type literal", () => {
  const body = "interface Whole {\n  at(path: string): string\n}\n"
  expect(reasonsIn(given("akasha/held.ts", body))).toHaveLength(1)
})

test("no call, construct or index signature is judged", () => {
  const body = [
    "interface Whole {",
    "  (one: string): number",
    "  new (one: string): Whole",
    "  [named: string]: unknown",
    "}",
  ].join("\n")
  expect(reasonsIn(given("akasha/held.ts", `${body}\n`))).toEqual([])
})

test("a method written on an object literal is not a signature", () => {
  const body = "const one = {\n  at(path: string) {\n    return path\n  },\n}\n"
  expect(reasonsIn(given("akasha/held.ts", body))).toEqual([])
})

test("a method written on a class is not a signature", () => {
  const body = "class Held extends Error {\n  at(path: string) {\n    return path\n  }\n}\n"
  expect(reasonsIn(given("akasha/held.ts", body))).toEqual([])
})

test("every method signature a file writes is reported, however deeply the type is nested", () => {
  const body = ["type One = {", "  a(): void", "  b: {", "    c(): void", "  }", "}"].join("\n")
  expect(reasonsIn(given("akasha/held.ts", `${body}\n`))).toHaveLength(2)
})

test("a method signature named by a computed key or a string is still named in the reason", () => {
  const said = reasonsIn(given("akasha/held.ts", 'type One = {\n  "at one"(): void\n}\n'))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain('"at one"')
})

test("an optional method signature is a method signature", () => {
  expect(reasonsIn(given("akasha/held.ts", "type One = {\n  a?(): void\n}\n"))).toHaveLength(
    1
  )
})

test("a method signature in a type literal standing as a parameter type is judged", () => {
  const body = "export function one(two: { a(): void }): void {\n  two.a()\n}\n"
  expect(reasonsIn(given("akasha/held.ts", body))).toHaveLength(1)
})

test("a file that is not TypeScript, and a body that is not text, are both passed over", () => {
  expect(reasonsIn(given("akasha/notes.txt", "type One = {\n  a(): void\n}\n"))).toEqual([])
  const raw = { root: ROOT, path: "akasha/raw.ts", bytes: new Uint8Array([0xff, 0xfe, 0x00]) }
  expect(reasonsIn(raw)).toEqual([])
})
