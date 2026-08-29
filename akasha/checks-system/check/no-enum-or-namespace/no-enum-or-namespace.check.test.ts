import { expect, test } from "bun:test"
import { noEnumOrNamespace } from "./no-enum-or-namespace.check.code.ts"

const ROOT = "/repo/akasha"

function given(at: string, body: string) {
  return { root: ROOT, path: `${ROOT}/${at}`, bytes: Buffer.from(body, "utf8") }
}

test("a file declaring neither an enum nor a namespace is let through", () => {
  const body = 'export type Needs = "path" | "file" | "tree"\n'
  expect(noEnumOrNamespace(given("held.ts", body))).toEqual([])
})

test("an enum is refused, and the reason names the line and the enum", () => {
  const said = noEnumOrNamespace(given("held.ts", "\nexport enum Held {\n  One,\n}\n"))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("line 2")
  expect(said[0]).toContain("`enum Held`")
})

test("a const enum is an enum", () => {
  expect(noEnumOrNamespace(given("held.ts", "const enum One {\n  Two,\n}\n"))).toHaveLength(1)
})

test("a named namespace is refused, and the reason names the line and the namespace", () => {
  const said = noEnumOrNamespace(given("held.ts", "namespace Held {\n  export const one = 1\n}\n"))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("`namespace Held`")
})

test("a module named by a string is not a namespace", () => {
  const body = 'declare module "typescript" {\n  export const one: number\n}\n'
  expect(noEnumOrNamespace(given("held.ts", body))).toEqual([])
})

test("`declare global` is left alone, because it names no namespace of its own", () => {
  const body = "declare global {\n  const one: number\n}\nexport {}\n"
  expect(noEnumOrNamespace(given("held.ts", body))).toEqual([])
})

test("every enum and namespace a file declares is reported, nested or at the top", () => {
  const body = "enum One {\n  A,\n}\nnamespace Two {\n  export enum Three {\n    B,\n  }\n}\n"
  expect(noEnumOrNamespace(given("held.ts", body))).toHaveLength(3)
})

test("a file that is not TypeScript, and a body that is not text, are both passed over", () => {
  expect(noEnumOrNamespace(given("notes.txt", "enum One {\n  A,\n}\n"))).toEqual([])
  const raw = { root: ROOT, path: `${ROOT}/raw.ts`, bytes: new Uint8Array([0xff, 0xfe, 0x00]) }
  expect(noEnumOrNamespace(raw)).toEqual([])
})
