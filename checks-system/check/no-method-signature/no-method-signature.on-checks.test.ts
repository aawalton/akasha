import { expect, test } from "bun:test"
import { resolve } from "node:path"
import noMethodSignature from "./no-method-signature.check.code.attachment.ts"

const AKASHA = resolve(import.meta.dir, "../../..")

function verdict(path: string, text: string): readonly string[] {
  return noMethodSignature.run({ root: AKASHA, path: `${AKASHA}/${path}`, body: Buffer.from(text) })
}

test("a property holding a function type passes", () => {
  expect(verdict("a/thing.ts", `interface Held { run: (x: number) => void }\n`)).toEqual([])
})

test("a method signature on an interface fails", () => {
  expect(verdict("a/thing.ts", `interface Held { run(x: number): void }\n`)).toHaveLength(1)
})

test("a method signature in a type literal fails", () => {
  expect(verdict("a/thing.ts", `type Held = { run(x: number): void }\n`)).toHaveLength(1)
})

test("a method signature in a nested type literal is found", () => {
  expect(verdict("a/thing.ts", `type Held = { inner: { run(): void } }\n`)).toHaveLength(1)
})

test("a method signature in a function parameter type is found", () => {
  expect(verdict("a/thing.ts", `export function take(held: { run(): void }) { return held }\n`)).toHaveLength(1)
})

test("every method signature on one interface is named", () => {
  const said = verdict("a/thing.ts", `interface Held {\n  one(): void\n  two(): void\n  three: () => void\n}\n`)
  expect(said).toHaveLength(2)
})

test("a property whose type is an object with no call is not judged", () => {
  expect(verdict("a/thing.ts", `interface Held { name: string; count: number }\n`)).toEqual([])
})

test("a call signature is not a method signature", () => {
  expect(verdict("a/thing.ts", `interface Held { (x: number): void }\n`)).toEqual([])
})

test("a construct signature is not a method signature", () => {
  expect(verdict("a/thing.ts", `interface Held { new (x: number): Held }\n`)).toEqual([])
})

test("an index signature is not a method signature", () => {
  expect(verdict("a/thing.ts", `interface Held { [key: string]: () => void }\n`)).toEqual([])
})

test("a function declaration is not a method signature", () => {
  expect(verdict("a/thing.ts", `export function run(x: number): void {}\n`)).toEqual([])
})

test("a declaration file is not judged", () => {
  expect(verdict("a/thing.d.ts", `interface Held { run(): void }\n`)).toEqual([])
})

test("a generated file is outside this check", () => {
  expect(verdict("a/generated/thing.ts", `interface Held { run(): void }\n`)).toEqual([])
  expect(verdict("a/thing.generated.ts", `interface Held { run(): void }\n`)).toEqual([])
})

test("a file under a fixtures directory is outside this check", () => {
  expect(verdict("a/__fixtures__/thing.ts", `interface Held { run(): void }\n`)).toEqual([])
})

test("a file of a kind that carries no code is not judged", () => {
  expect(verdict("a/thing.md", `interface Held { run(): void }\n`)).toEqual([])
})

test("a body that is not UTF-8 text is not judged", () => {
  const body = Buffer.from([0xff, 0xfe, 0x00])
  expect(noMethodSignature.run({ root: AKASHA, path: `${AKASHA}/a/thing.ts`, body })).toEqual([])
})

test("the reason names the line and the member", () => {
  const said = verdict("a/thing.ts", `export const x = 1\n\ninterface Held {\n  run(): void\n}\n`)
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("line 4")
  expect(said[0]).toContain("run")
})

test("an optional method signature is still a method signature", () => {
  expect(verdict("a/thing.ts", `interface Held { run?(): void }\n`)).toHaveLength(1)
})

test("a tsx file is parsed as tsx", () => {
  expect(verdict("a/thing.tsx", `interface Held { run(): void }\nexport const view = <div />\n`)).toHaveLength(1)
})
