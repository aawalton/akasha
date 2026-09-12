import { expect, test } from "bun:test"
import {
  PROBE_AT,
  parsed,
} from "akasha/checks/code-checks/pages/no-refused-syntax/no-refused-syntax.code-check.decision.test-fixtures.ts"
import {
  mark,
  noVoidReturn,
} from "akasha/checks/code-checks/pages/no-refused-syntax/syntax-rules/no-void-return/no-void-return.syntax-rule.code.ts"

test("a file returning nothing that way is refused nothing", () => {
  expect(noVoidReturn(parsed("export const one = 1\n"))).toEqual([])
})

test("a function declaration annotated that way is refused", () => {
  const said = noVoidReturn(parsed("function one(): void {}\n"))
  expect(said).toHaveLength(1)
  expect(said[0]?.reason).toContain("`undefined`")
})

test("an arrow annotated that way is refused", () => {
  expect(noVoidReturn(parsed("const one = (): void => {}\n"))).toHaveLength(1)
})

test("a function expression annotated that way is refused", () => {
  expect(noVoidReturn(parsed("const one = function (): void {}\n"))).toHaveLength(1)
})

test("a method declaration is refused", () => {
  expect(noVoidReturn(parsed("class One { two(): void {} }\n"))).toHaveLength(1)
})

test("a method an object literal carries is refused", () => {
  expect(noVoidReturn(parsed("const one = { two(): void {} }\n"))).toHaveLength(1)
})

test("a getter is refused", () => {
  expect(noVoidReturn(parsed("class One { get two(): void {} }\n"))).toHaveLength(1)
})

test("a function type is left, being a function written elsewhere", () => {
  expect(noVoidReturn(parsed("type One = () => void\n"))).toEqual([])
})

test("a callback parameter's type is left", () => {
  expect(noVoidReturn(parsed("function one(two: () => void): undefined {}\n"))).toEqual([])
})

test("a property holding a function type is left", () => {
  expect(noVoidReturn(parsed("interface One { two: () => void }\n"))).toEqual([])
})

test("a method signature is left", () => {
  expect(noVoidReturn(parsed("interface One { two(): void }\n"))).toEqual([])
})

test("a call signature is left", () => {
  expect(noVoidReturn(parsed("interface One { (): void }\n"))).toEqual([])
})

test("a constructor type is left", () => {
  expect(noVoidReturn(parsed("type One = new () => void\n"))).toEqual([])
})

test("a return annotation that is itself a function type is left", () => {
  expect(noVoidReturn(parsed("function one(): () => void {\n  return () => {}\n}\n"))).toEqual([])
})

test("an arrow filling a `void` slot is refused for its own annotation alone", () => {
  const said = noVoidReturn(parsed("const one: () => void = (): void => {}\n"))
  expect(said).toHaveLength(1)
  expect(said[0]?.line).toBe(1)
})

test("`undefined` in the same place is left", () => {
  expect(noVoidReturn(parsed("function one(): undefined {}\n"))).toEqual([])
})

test("a type argument is left, so `Promise<void>` is left", () => {
  expect(noVoidReturn(parsed("async function one(): Promise<void> {}\n"))).toEqual([])
})

test("the operator spelling is no type and is untouched", () => {
  expect(noVoidReturn(parsed("const one = void 0\n"))).toEqual([])
})

test("the word inside a string literal is not a return type", () => {
  expect(noVoidReturn(parsed('const one = "(): void"\n'))).toEqual([])
})

test("a parameter typed that way is not itself refused", () => {
  expect(noVoidReturn(parsed("declare function one(two: number): number\n"))).toEqual([])
})

test("an overload signature is refused beside the body it heads", () => {
  expect(noVoidReturn(parsed("function one(): void\nfunction one(): void {}\n"))).toHaveLength(2)
})

test("a method an ambient declaration carries is left", () => {
  expect(noVoidReturn(parsed("declare class One {\n  two(): void\n}\n"))).toEqual([])
})

test("a function an ambient module declares is left", () => {
  const text = 'declare module "one" {\n  export function two(): void\n}\n'
  expect(noVoidReturn(parsed(text))).toEqual([])
})

test("a function nested inside a call is judged too", () => {
  expect(noVoidReturn(parsed("run(function (): void {})\n"))).toHaveLength(1)
})

test("the line named is the annotation's own", () => {
  const said = noVoidReturn(parsed("const one = 1\nfunction two(): void {}\n"))
  expect(said[0]?.line).toBe(2)
})

test("this mark excuses a file only where this rule could not have refused it", () => {
  const text = "function one(): void {}\n"
  expect(noVoidReturn(parsed(text))).toHaveLength(1)
  expect(mark(text, PROBE_AT)).toBe(true)
})

test("two of them are refused once each", () => {
  const text = "function one(): void {}\nfunction two(): void {}\n"
  expect(noVoidReturn(parsed(text))).toHaveLength(2)
})
