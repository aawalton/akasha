import { expect, test } from "bun:test"
import {
  boundIn,
  shadowedIn,
  thereIn,
} from "akasha/change/modules/name-binding/name-binding.module.code.ts"
import { parsedAs } from "akasha/code/reading/modules/code-source/code-source.module.code.ts"
import type ts from "typescript"

const AT = "one/held.ts"

const BODY = `import ts from "typescript"
import * as every from "./every.held.ts"
import { kept } from "./kept.held.ts"

export const given = 1

export function overOf(): void {}

export type Held = number

export interface Wraps {
  readonly one: number
}
`

function statedIn(text: string): ts.Node {
  const source = parsedAs(AT, text)
  return source.statements[0] ?? source
}

test("a parameter binds its name beneath the declaration", () => {
  expect([...boundIn(statedIn("export function overOf(given: number): void {}\n"))]).toEqual([
    "given",
  ])
})

test("a parameter of a function type binds as a parameter of a function with a body does", () => {
  const held = boundIn(statedIn("export const overOf: (given: number) => void = () => {}\n"))

  expect([...held]).toEqual(["given"])
})

test("a type parameter binds its name", () => {
  expect([...boundIn(statedIn("export type Held<Kept> = readonly Kept[]\n"))]).toEqual(["Kept"])
})

test("a variable and a function declared beneath each bind their name", () => {
  const text =
    "export function overOf(): void {\n  const kept = 1\n  function innerOf(): void {}\n}\n"

  expect([...boundIn(statedIn(text))]).toEqual(["kept", "innerOf"])
})

test("a name a pattern binds is bound and the key it binds from is not", () => {
  const held = boundIn(statedIn("export function overOf({ one: kept }: Held): void {}\n"))

  expect([...held]).toEqual(["kept"])
})

test("the name a declaration itself states is bound above it rather than beneath it", () => {
  expect([...boundIn(statedIn("export const given = 1\n"))]).toEqual([])
})

test("a body binds at its top every name its import lines name", () => {
  const held = thereIn(parsedAs(AT, BODY))

  expect(held.has("kept")).toBe(true)
  expect(held.has("every")).toBe(true)
  expect(held.has("ts")).toBe(true)
})

test("a body binds at its top every name declared there", () => {
  const held = thereIn(parsedAs(AT, BODY))

  expect(held.has("given")).toBe(true)
  expect(held.has("overOf")).toBe(true)
  expect(held.has("Held")).toBe(true)
  expect(held.has("Wraps")).toBe(true)
})

test("the name answered is the first name bound beneath that the body binds at its top", () => {
  const text = "export const reasonsOver: (given: number) => readonly string[] = () => []\n"

  expect(shadowedIn(parsedAs(AT, BODY), statedIn(text))).toBe("given")
})

test("a declaration shadowing nothing is answered with no name", () => {
  const text = "export const reasonsOver: (one: number) => readonly string[] = () => []\n"

  expect(shadowedIn(parsedAs(AT, BODY), statedIn(text))).toBeNull()
})

test("a name bound only beneath the declaration shadows nothing the body binds", () => {
  const text =
    "export function otherOf(one: number): number {\n  return [one].map((one) => one)[0] ?? one\n}\n"

  expect(shadowedIn(parsedAs(AT, BODY), statedIn(text))).toBeNull()
})
