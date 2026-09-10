import { expect, test } from "bun:test"
import { parsed } from "../../no-refused-syntax.code-check.decision.test-fixtures.ts"
import { noVoidSelfInConstructor } from "./no-void-self-in-constructor.syntax-rule.code.ts"

test("a file holding no constructor member is refused nothing", () => {
  expect(noVoidSelfInConstructor(parsed("export const one = 1\n"))).toEqual([])
})

test("a New whose sole parameter is `this: void` is refused", () => {
  const text = "interface HeldClass {\n  New: (this: void) => Held\n}\n"
  const said = noVoidSelfInConstructor(parsed(text))
  expect(said).toHaveLength(1)
  expect(said[0]?.reason).toContain("`New`")
  expect(said[0]?.reason).toContain("shifts by one")
})

test("a Subclass whose sole parameter is `this: void` is refused", () => {
  const text = "interface HeldClass {\n  Subclass: (this: void) => Held\n}\n"
  expect(noVoidSelfInConstructor(parsed(text))).toHaveLength(1)
})

test("a New written as a method signature is read too", () => {
  const text = "interface HeldClass {\n  New(this: void): Held\n}\n"
  expect(noVoidSelfInConstructor(parsed(text))).toHaveLength(1)
})

test("a New handed the class as its next parameter is left", () => {
  const text = "interface HeldClass {\n  New: (this: void, self: object) => Held\n}\n"
  expect(noVoidSelfInConstructor(parsed(text))).toEqual([])
})

test("a New whose next parameter is typed `object` is left", () => {
  const text = "interface HeldClass {\n  New: (this: void, held: object) => Held\n}\n"
  expect(noVoidSelfInConstructor(parsed(text))).toEqual([])
})

test("a New naming its class is left", () => {
  const text = "interface HeldClass {\n  New: (this: HeldClass) => Held\n}\n"
  expect(noVoidSelfInConstructor(parsed(text))).toEqual([])
})

test("a New declaring no `this` at all is left", () => {
  const text = "interface HeldClass {\n  New: (held: number) => Held\n}\n"
  expect(noVoidSelfInConstructor(parsed(text))).toEqual([])
})

test("a member under some other name is left", () => {
  const text = "interface HeldClass {\n  Make: (this: void) => Held\n}\n"
  expect(noVoidSelfInConstructor(parsed(text))).toEqual([])
})

test("a property whose type is no function is left", () => {
  expect(noVoidSelfInConstructor(parsed("interface HeldClass {\n  New: number\n}\n"))).toEqual([])
})

test("the line named is the line the member is on", () => {
  const text = "interface HeldClass {\n  held: number\n  New: (this: void) => Held\n}\n"
  expect(noVoidSelfInConstructor(parsed(text))[0]?.line).toBe(3)
})

test("two constructors declaring it are refused once each", () => {
  const text =
    "interface HeldClass {\n  New: (this: void) => Held\n  Subclass: (this: void) => Held\n}\n"
  expect(noVoidSelfInConstructor(parsed(text))).toHaveLength(2)
})

test("a constructor inside a nested type literal is judged too", () => {
  const text = "interface HeldClass {\n  inner: { New: (this: void) => Held }\n}\n"
  expect(noVoidSelfInConstructor(parsed(text))).toHaveLength(1)
})
