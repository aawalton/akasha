import { expect, test } from "bun:test"
import { resolve } from "node:path"
import noClass from "./no-class.check.code.attachment.ts"

const AKASHA = resolve(import.meta.dir, "../../..")

function verdict(path: string, text: string): readonly string[] {
  return noClass.run({ root: AKASHA, path: `${AKASHA}/${path}`, body: Buffer.from(text) })
}

test("a file declaring no class passes", () => {
  expect(verdict("a/thing.ts", `export const make = () => ({ x: 1 })\n`)).toEqual([])
})

test("a class declaration fails", () => {
  expect(verdict("a/thing.ts", `export class Thing {\n  x = 1\n}\n`)).toHaveLength(1)
})

test("a class extending Error passes", () => {
  expect(verdict("a/thing.ts", `export class Refused extends Error {}\n`)).toEqual([])
})

test("a React error boundary passes", () => {
  const body = `import * as React from "react"\nexport class Boundary extends React.Component {\n  static getDerivedStateFromError(e) { return { e } }\n  render() { return null }\n}\n`
  expect(verdict("a/thing.tsx", body)).toEqual([])
  const other = `export class Boundary extends Component {\n  componentDidCatch(e) {}\n  render() { return null }\n}\n`
  expect(verdict("a/thing.tsx", other)).toEqual([])
})

test("a React component that catches nothing fails", () => {
  const body = `import * as React from "react"\nexport class Panel extends React.Component {\n  render() { return null }\n}\n`
  expect(verdict("a/thing.tsx", body)).toHaveLength(1)
})

test("a class expression fails even where it extends Error", () => {
  expect(verdict("a/thing.ts", `const Thing = class {}\n`)).toHaveLength(1)
  expect(verdict("a/thing.ts", `const Thing = class extends Error {}\n`)).toHaveLength(1)
  expect(verdict("a/thing.ts", `export function make() { return class Inner {} }\n`)).toHaveLength(1)
})

test("a class nested inside a function is found", () => {
  expect(verdict("a/thing.ts", `function make() {\n  class Inner {}\n  return Inner\n}\n`)).toHaveLength(1)
})

test("every class in a file is named", () => {
  expect(verdict("a/thing.ts", `class One {}\nclass Two {}\nclass Three extends Error {}\n`)).toHaveLength(2)
})

test("a declaration file is not judged", () => {
  expect(verdict("a/thing.d.ts", `export declare class Thing {}\n`)).toEqual([])
})

test("a generated file is outside this check", () => {
  expect(verdict("a/generated/thing.ts", `export class Thing {}\n`)).toEqual([])
  expect(verdict("a/thing.generated.ts", `export class Thing {}\n`)).toEqual([])
  expect(verdict("a/thing.ts", `// @generated\nexport class Thing {}\n`)).toEqual([])
})

test("a file under a fixtures directory is outside this check", () => {
  expect(verdict("a/__fixtures__/thing.ts", `export class Thing {}\n`)).toEqual([])
})

test("a lualib polyfill is outside this check", () => {
  expect(verdict("lua-compiler/lualib/src/5.0/Thing.ts", `export class Thing {}\n`)).toEqual([])
  expect(verdict("lua-compiler/other/Thing.ts", `export class Thing {}\n`)).toHaveLength(1)
})

test("a file of a kind that carries no code is not judged", () => {
  expect(verdict("a/thing.md", `export class Thing {}\n`)).toEqual([])
  expect(verdict("a/thing.lua", `export class Thing {}\n`)).toEqual([])
})

test("a body that is not UTF-8 text is not judged", () => {
  expect(noClass.run({ root: AKASHA, path: `${AKASHA}/a/thing.ts`, body: Buffer.from([0xff, 0xfe, 0x00]) })).toEqual([])
})

test("the word class inside a string is not a class", () => {
  expect(verdict("a/thing.ts", `export const said = "class Thing {}"\n`)).toEqual([])
})

test("the reason names the line and what it declares", () => {
  const said = verdict("a/thing.ts", `export const x = 1\n\nexport class Thing {}\n`)
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("line 3")
  expect(said[0]).toContain("Thing")
})

test("the reason names what a permitted-looking class extends", () => {
  const said = verdict("a/thing.tsx", `export class Panel extends React.Component {\n  render() { return null }\n}\n`)
  expect(said[0]).toContain("React.Component")
})
