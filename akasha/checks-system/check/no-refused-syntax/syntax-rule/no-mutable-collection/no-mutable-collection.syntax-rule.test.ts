import { expect, test } from "bun:test"
import { parsedAs } from "../../../../../code-system/code-source/code-source.module.code.ts"
import type { Standing } from "../syntax-rule.page-type.ts"
import { noMutableCollection } from "./no-mutable-collection.syntax-rule.code.ts"

const PATH = "akasha/one/probe.module.code.ts"

function standing(text: string): Standing {
  return { path: PATH, source: parsedAs(PATH, text) }
}

test("a file holding no collection at all is refused nothing", () => {
  expect(noMutableCollection(standing("export const one = 1\n"))).toEqual([])
})

test("a parameter typed `T[]` is refused", () => {
  const said = noMutableCollection(standing("declare function one(two: string[]): undefined\n"))
  expect(said).toHaveLength(1)
  expect(said[0]?.reason).toContain("`readonly`")
})

test("the same parameter written readonly stands", () => {
  const text = "declare function one(two: readonly string[]): undefined\n"
  expect(noMutableCollection(standing(text))).toEqual([])
})

test("a return type typed `Array<T>` is refused", () => {
  const said = noMutableCollection(standing("declare function one(): Array<string>\n"))
  expect(said).toHaveLength(1)
  expect(said[0]?.reason).toContain("`ReadonlyArray`")
})

test("a `Set` handed out is refused, the old rule having reached no set at all", () => {
  const said = noMutableCollection(standing("declare function one(two: Set<string>): undefined\n"))
  expect(said).toHaveLength(1)
  expect(said[0]?.reason).toContain("`ReadonlySet`")
})

test("a `Map` handed back is refused", () => {
  const said = noMutableCollection(standing("declare function one(): Map<string, number>\n"))
  expect(said).toHaveLength(1)
  expect(said[0]?.reason).toContain("`ReadonlyMap`")
})

test("`ReadonlyMap` in the same place stands", () => {
  expect(
    noMutableCollection(standing("declare function one(): ReadonlyMap<string, number>\n"))
  ).toEqual([])
})

test("a property holding a mutable array is refused though the property is readonly", () => {
  const said = noMutableCollection(standing("type One = { readonly two: string[] }\n"))
  expect(said).toHaveLength(1)
})

test("a tuple handed out is refused", () => {
  expect(noMutableCollection(standing("type One = [string, number]\n"))).toHaveLength(1)
})

test("a mutable array inside a readonly one is refused, the reach going all the way down", () => {
  expect(noMutableCollection(standing("type One = readonly string[][]\n"))).toHaveLength(1)
})

test("a local's own annotation is not judged, no one outside reaching that name", () => {
  const text = "function one(): undefined {\n  const two: string[] = []\n}\n"
  expect(noMutableCollection(standing(text))).toEqual([])
})

test("a body filling what it made and handing it back readonly stands", () => {
  const text = [
    "export function one(two: readonly string[]): readonly string[] {",
    "  const found: string[] = []",
    "  for (const each of two) found.push(each)",
    "  return found",
    "}",
    "",
  ].join("\n")
  expect(noMutableCollection(standing(text))).toEqual([])
})

test("a body filling what it was handed is refused", () => {
  const text = [
    "export function one(found: string[]): undefined {",
    "  found.push('two')",
    "}",
    "",
  ].join("\n")
  const said = noMutableCollection(standing(text))
  expect(said).toHaveLength(2)
  expect(said[1]?.reason).toContain("did not make")
})

test("a set a body made is its own to fill", () => {
  const text = [
    "export function one(): ReadonlySet<string> {",
    "  const found = new Set<string>()",
    "  found.add('two')",
    "  return found",
    "}",
    "",
  ].join("\n")
  expect(noMutableCollection(standing(text))).toEqual([])
})

test("a set a body was handed is not", () => {
  const text = [
    "export function one(found: ReadonlySet<string>): undefined {",
    "  found.add('two')",
    "}",
    "",
  ].join("\n")
  expect(noMutableCollection(standing(text))).toHaveLength(1)
})

test("a name bound first to nothing and then to what the body made is the body's own", () => {
  const text = [
    "export function one(): undefined {",
    "  let open: { readonly held: string[] } | null = null",
    "  open = { held: [] }",
    "  open.held.push('two')",
    "}",
    "",
  ].join("\n")
  expect(noMutableCollection(standing(text))).toEqual([])
})

test("a nested body may change what the body holding it made", () => {
  const text = [
    "export function one(): undefined {",
    "  const found = new Map<string, number>()",
    "  const walk = (at: string): undefined => {",
    "    found.set(at, 1)",
    "  }",
    "  walk('two')",
    "}",
    "",
  ].join("\n")
  expect(noMutableCollection(standing(text))).toEqual([])
})

test("a body may change what it just made in place", () => {
  expect(noMutableCollection(standing("const one = [3, 1].sort()\n"))).toEqual([])
})

test("a copy made by spreading is the body's own to sort", () => {
  const text =
    "export function one(two: readonly number[]): readonly number[] {\n  return [...two].sort()\n}\n"
  expect(noMutableCollection(standing(text))).toEqual([])
})

test("a collection a call handed back is not one this body made", () => {
  const text =
    "export function one(two: object): readonly string[] {\n  return Object.keys(two).sort()\n}\n"
  expect(noMutableCollection(standing(text))).toHaveLength(1)
})

test("a name a body binds to what it was handed is not its own, however it was spelt", () => {
  const text = [
    "export function one(two: ReadonlyMap<string, string[]>): undefined {",
    "  const held = two.get('three')",
    "  held?.push('four')",
    "}",
    "",
  ].join("\n")
  expect(noMutableCollection(standing(text))).toHaveLength(2)
})

test("the words inside a string literal name no collection", () => {
  expect(noMutableCollection(standing('const one = "found.push(two): string[]"\n'))).toEqual([])
})

test("the line named is the one to change", () => {
  const text = "const one = 1\ndeclare function two(three: string[]): undefined\n"
  expect(noMutableCollection(standing(text))[0]?.line).toBe(2)
})

test("two of them are refused once each", () => {
  const text = "declare function one(two: string[]): Set<number>\n"
  expect(noMutableCollection(standing(text))).toHaveLength(2)
})
