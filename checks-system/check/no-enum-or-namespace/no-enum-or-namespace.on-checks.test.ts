import { expect, test } from "bun:test"
import { resolve } from "node:path"
import noEnumOrNamespace from "./no-enum-or-namespace.check.code.attachment.ts"

const AKASHA = resolve(import.meta.dir, "../../..")

function verdict(path: string, text: string): readonly string[] {
  return noEnumOrNamespace.run({ root: AKASHA, path: `${AKASHA}/${path}`, body: Buffer.from(text) })
}

test("a string-literal union passes", () => {
  expect(verdict("a/thing.ts", `export type Colour = "red" | "blue"\n`)).toEqual([])
})

test("an enum fails", () => {
  expect(verdict("a/thing.ts", `export enum Colour { Red }\n`)).toHaveLength(1)
})

test("a const enum is an enum", () => {
  expect(verdict("a/thing.ts", `export const enum Colour { Red }\n`)).toHaveLength(1)
})

test("an ambient enum is an enum", () => {
  expect(verdict("a/thing.ts", `declare enum Colour { Red }\n`)).toHaveLength(1)
})

test("a named namespace fails", () => {
  expect(verdict("a/thing.ts", `namespace Held { export const x = 1 }\n`)).toHaveLength(1)
})

test("a namespace inside a namespace is named too", () => {
  expect(verdict("a/thing.ts", `namespace Outer { export namespace Inner {} }\n`)).toHaveLength(2)
})

test("a declare global block is not a namespace", () => {
  expect(verdict("a/thing.ts", `declare global { interface Window { x: number } }\n`)).toEqual([])
})

test("an enum inside a declare global block is still an enum", () => {
  expect(verdict("a/thing.ts", `declare global { enum Sneaky { A } }\n`)).toHaveLength(1)
})

test("augmenting a module by name is not a namespace", () => {
  expect(verdict("a/thing.ts", `declare module "foo" { export const x: number }\n`)).toEqual([])
})

test("a declaration file is not judged", () => {
  expect(verdict("a/thing.d.ts", `export declare enum Colour { Red }\n`)).toEqual([])
})

test("a generated file is outside this check", () => {
  expect(verdict("a/generated/thing.ts", `export enum Colour { Red }\n`)).toEqual([])
  expect(verdict("a/thing.generated.ts", `export enum Colour { Red }\n`)).toEqual([])
  expect(verdict("a/thing.ts", `// @generated\nexport enum Colour { Red }\n`)).toEqual([])
})

test("a file under a fixtures directory is outside this check", () => {
  expect(verdict("a/__fixtures__/thing.ts", `export enum Colour { Red }\n`)).toEqual([])
})

test("a file of a kind that carries no code is not judged", () => {
  expect(verdict("a/thing.md", `export enum Colour { Red }\n`)).toEqual([])
})

test("a body that is not UTF-8 text is not judged", () => {
  const body = Buffer.from([0xff, 0xfe, 0x00])
  expect(noEnumOrNamespace.run({ root: AKASHA, path: `${AKASHA}/a/thing.ts`, body })).toEqual([])
})

test("the word enum inside a string is not an enum", () => {
  expect(verdict("a/thing.ts", `export const said = "enum Colour { Red }"\n`)).toEqual([])
})

test("a tsx file is parsed as tsx", () => {
  expect(verdict("a/thing.tsx", `export enum Colour { Red }\nexport const view = <div />\n`)).toHaveLength(1)
})

test("the reason names the line and what it declares", () => {
  const said = verdict("a/thing.ts", `export const x = 1\n\nexport enum Colour { Red }\n`)
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("line 3")
  expect(said[0]).toContain("Colour")
})
