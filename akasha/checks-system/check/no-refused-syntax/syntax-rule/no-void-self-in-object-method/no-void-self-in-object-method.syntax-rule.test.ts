import { expect, test } from "bun:test"
import { standing } from "../../no-refused-syntax.check.test-fixtures.ts"
import { noVoidSelfInObjectMethod } from "./no-void-self-in-object-method.syntax-rule.code.ts"

test("a file holding no object literal is refused nothing", () => {
  expect(noVoidSelfInObjectMethod(standing("export const one = 1\n"))).toEqual([])
})

test("a method written into an object literal declaring `this: void` is refused", () => {
  const said = noVoidSelfInObjectMethod(
    standing("const one = { held(this: void, a: number) {} }\n")
  )
  expect(said).toHaveLength(1)
  expect(said[0]?.reason).toContain("`held`")
  expect(said[0]?.reason).toContain("shifts by one")
})

test("a function assigned to a property is left", () => {
  expect(noVoidSelfInObjectMethod(standing("const one = { held: (this: void) => {} }\n"))).toEqual(
    []
  )
})

test("a function expression assigned to a property is left", () => {
  const text = "const one = { held: function (this: void) {} }\n"
  expect(noVoidSelfInObjectMethod(standing(text))).toEqual([])
})

test("a method on a class is left", () => {
  const text = "class Held {\n  held(this: void) {}\n}\n"
  expect(noVoidSelfInObjectMethod(standing(text))).toEqual([])
})

test("a `this` named as some other type is left", () => {
  expect(noVoidSelfInObjectMethod(standing("const one = { held(this: Held) {} }\n"))).toEqual([])
})

test("a method declaring no `this` at all is left", () => {
  expect(noVoidSelfInObjectMethod(standing("const one = { held(a: number) {} }\n"))).toEqual([])
})

test("a method taking nothing at all is left", () => {
  expect(noVoidSelfInObjectMethod(standing("const one = { held() {} }\n"))).toEqual([])
})

test("the line named is the line the method stands on", () => {
  const said = noVoidSelfInObjectMethod(standing("const one = {\n  held(this: void) {},\n}\n"))
  expect(said[0]?.line).toBe(2)
})

test("a method in an object literal nested inside another is judged too", () => {
  const text = "const one = { inner: { held(this: void) {} } }\n"
  expect(noVoidSelfInObjectMethod(standing(text))).toHaveLength(1)
})

test("two methods declaring it are refused once each", () => {
  const text = "const one = { a(this: void) {}, b(this: void) {} }\n"
  expect(noVoidSelfInObjectMethod(standing(text))).toHaveLength(2)
})
