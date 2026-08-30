import { expect, test } from "bun:test"
import { standing } from "../../no-refused-syntax.check.test-fixtures.ts"
import { noVoidReturn } from "./no-void-return.syntax-rule.code.ts"

test("a file returning nothing that way is refused nothing", () => {
  expect(noVoidReturn(standing("export const one = 1\n"))).toEqual([])
})

test("a function declaration annotated that way is refused", () => {
  const said = noVoidReturn(standing("function one(): void {}\n"))
  expect(said).toHaveLength(1)
  expect(said[0]?.reason).toContain("`undefined`")
})

test("an arrow annotated that way is refused", () => {
  expect(noVoidReturn(standing("const one = (): void => {}\n"))).toHaveLength(1)
})

test("a method declaration is refused", () => {
  expect(noVoidReturn(standing("class One { two(): void {} }\n"))).toHaveLength(1)
})

test("a function type is refused, that being the slot the value lands in", () => {
  expect(noVoidReturn(standing("type One = () => void\n"))).toHaveLength(1)
})

test("a method signature is refused", () => {
  expect(noVoidReturn(standing("interface One { two(): void }\n"))).toHaveLength(1)
})

test("a call signature is refused", () => {
  expect(noVoidReturn(standing("interface One { (): void }\n"))).toHaveLength(1)
})

test("a property holding a function type is refused", () => {
  expect(noVoidReturn(standing("interface One { two: () => void }\n"))).toHaveLength(1)
})

test("a constructor type is refused", () => {
  expect(noVoidReturn(standing("type One = new () => void\n"))).toHaveLength(1)
})

test("`undefined` in the same place stands", () => {
  expect(noVoidReturn(standing("function one(): undefined {}\n"))).toEqual([])
})

test("a type argument stands, so `Promise<void>` is left", () => {
  expect(noVoidReturn(standing("async function one(): Promise<void> {}\n"))).toEqual([])
})

test("the operator spelling is no type and is untouched", () => {
  expect(noVoidReturn(standing("const one = void 0\n"))).toEqual([])
})

test("the word inside a string literal is not a return type", () => {
  expect(noVoidReturn(standing('const one = "(): void"\n'))).toEqual([])
})

test("a parameter typed that way is not itself refused", () => {
  expect(noVoidReturn(standing("declare function one(two: number): number\n"))).toEqual([])
})

test("an overload signature is refused beside the body it heads", () => {
  expect(noVoidReturn(standing("function one(): void\nfunction one(): void {}\n"))).toHaveLength(2)
})

test("a function nested inside a call is judged too", () => {
  expect(noVoidReturn(standing("run(function (): void {})\n"))).toHaveLength(1)
})

test("the line named is the annotation's own", () => {
  const said = noVoidReturn(standing("const one = 1\nfunction two(): void {}\n"))
  expect(said[0]?.line).toBe(2)
})

test("two of them are refused once each", () => {
  const text = "function one(): void {}\nfunction two(): void {}\n"
  expect(noVoidReturn(standing(text))).toHaveLength(2)
})
