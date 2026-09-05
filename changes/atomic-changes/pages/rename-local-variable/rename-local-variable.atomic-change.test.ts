import { expect, test } from "bun:test"
import { renameLocalVariable } from "./rename-local-variable.atomic-change.code.ts"

const AT = "/repo/one.ts"

function bodyOf(text: string, of: string, to: string): string {
  const answered = renameLocalVariable(AT, text, { at: text.indexOf(of), to })
  expect(answered.refused).toBe(null)
  return answered.body ?? ""
}

function whyOf(text: string, of: string, to: string): string {
  const answered = renameLocalVariable(AT, text, { at: text.indexOf(of), to })
  expect(answered.body).toBe(null)
  return answered.refused ?? ""
}

test("a local const and its references are spelled anew", () => {
  const text = "export function f(): number {\n  const n = 1\n  return n + n\n}\n"
  expect(bodyOf(text, "n = 1", "total")).toBe(
    "export function f(): number {\n  const total = 1\n  return total + total\n}\n"
  )
})

test("a parameter is renamed where its references are", () => {
  const text = "export function f(n: number): number {\n  return n + 1\n}\n"
  expect(bodyOf(text, "n: number", "count")).toBe(
    "export function f(count: number): number {\n  return count + 1\n}\n"
  )
})

test("a shorthand property keeps its key", () => {
  const text = "export function f(): object {\n  const n = 1\n  return { n }\n}\n"
  expect(bodyOf(text, "n = 1", "total")).toBe(
    "export function f(): object {\n  const total = 1\n  return { n: total }\n}\n"
  )
})

test("a property of the same name is left alone", () => {
  const text = "export function f(o: { n: number }): number {\n  const n = 1\n  return o.n + n\n}\n"
  expect(bodyOf(text, "n = 1", "total")).toBe(
    "export function f(o: { n: number }): number {\n  const total = 1\n  return o.n + total\n}\n"
  )
})

test("a binding the file declares is refused", () => {
  const text = "const n = 1\nexport function f(): number {\n  return n\n}\n"
  expect(whyOf(text, "n = 1", "total")).toBe("`n` is bound by the file rather than locally")
})

test("a name already in scope is refused", () => {
  const text = "export function f(total: number): number {\n  const n = 1\n  return n + total\n}\n"
  expect(whyOf(text, "n = 1", "total")).toBe("`total` is already declared in this file")
})

test("a reserved word is refused", () => {
  const text = "export function f(): number {\n  const n = 1\n  return n\n}\n"
  expect(whyOf(text, "n = 1", "class")).toBe("`class` is a reserved word")
})

test("a name that is no identifier is refused", () => {
  const text = "export function f(): number {\n  const n = 1\n  return n\n}\n"
  expect(whyOf(text, "n = 1", "2total")).toBe("`2total` is no identifier")
})

test("a var is refused", () => {
  const text = "export function f(): number {\n  var n = 1\n  return n\n}\n"
  expect(whyOf(text, "n = 1", "total")).toBe(
    "a `var` binding is scoped by its function rather than by its block"
  )
})

test("a destructured declaration is refused", () => {
  const text = "export function f(o: { n: number }): number {\n  const { n } = o\n  return n\n}\n"
  expect(whyOf(text, "n } = o", "total")).toBe("a destructured name is no simple binding")
})

test("a name declared again inside its own scope is refused", () => {
  const text =
    "export function f(): number {\n  const n = 1\n  {\n    const n = 2\n    return n\n  }\n}\n"
  expect(whyOf(text, "n = 1", "total")).toBe("`n` is declared again inside its own scope")
})

test("the name it already carries is refused", () => {
  const text = "export function f(): number {\n  const n = 1\n  return n\n}\n"
  expect(whyOf(text, "n = 1", "n")).toBe("`n` is the name it already carries")
})
