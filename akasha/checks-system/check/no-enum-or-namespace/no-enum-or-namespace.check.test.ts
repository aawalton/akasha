import { expect, test } from "bun:test"
import { bodiesIn } from "../../../testing-system/bodying/bodying.module.code.ts"
import { reasonsIn } from "./no-enum-or-namespace.check.code.ts"

const ROOT = "/repo"

const given = bodiesIn(ROOT)

test("a file declaring neither an enum nor a namespace is let through", () => {
  const body = 'export type Needs = "path" | "file"\n'
  expect(reasonsIn(given("akasha/held.ts", body))).toEqual([])
})

test("an enum is refused, and the reason names the line and the enum", () => {
  const said = reasonsIn(given("akasha/held.ts", "\nexport enum Held {\n  One,\n}\n"))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("line 2")
  expect(said[0]).toContain("`enum Held`")
})

test("a const enum is an enum", () => {
  expect(reasonsIn(given("akasha/held.ts", "const enum One {\n  Two,\n}\n"))).toHaveLength(1)
})

test("a declared enum is an enum", () => {
  expect(reasonsIn(given("akasha/held.d.ts", "declare enum One {\n  Two,\n}\n"))).toHaveLength(1)
})

test("a named namespace is refused, and the reason names the line and the namespace", () => {
  const body = "namespace Held {\n  export const one = 1\n}\n"
  const said = reasonsIn(given("akasha/held.ts", body))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("`namespace Held`")
})

test("`module Held` is the same declaration as `namespace Held`, and is refused", () => {
  const body = "module Held {\n  export const one = 1\n}\n"
  expect(reasonsIn(given("akasha/held.ts", body))).toHaveLength(1)
})

test("a module named by a string is not a namespace", () => {
  const body = 'declare module "typescript" {\n  export const one: number\n}\n'
  expect(reasonsIn(given("akasha/held.ts", body))).toEqual([])
})

test("`declare global` is left alone, because it names no namespace of its own", () => {
  const body = "declare global {\n  const one: number\n}\nexport {}\n"
  expect(reasonsIn(given("akasha/held.ts", body))).toEqual([])
})

test("every enum and namespace a file declares is reported, nested or at the top", () => {
  const body = "enum One {\n  A,\n}\nnamespace Two {\n  export enum Three {\n    B,\n  }\n}\n"
  expect(reasonsIn(given("akasha/held.ts", body))).toHaveLength(3)
})

test("a dotted namespace declares one namespace a name, and each is reported", () => {
  const body = "namespace One.Two {\n  export const three = 3\n}\n"
  const said = reasonsIn(given("akasha/held.ts", body))
  expect(said).toHaveLength(2)
  expect(said[0]).toContain("`namespace One`")
  expect(said[1]).toContain("`namespace Two`")
})

test("a file that is not TypeScript, and a body that is not text, are both passed over", () => {
  expect(reasonsIn(given("akasha/notes.txt", "enum One {\n  A,\n}\n"))).toEqual([])
  const raw = { root: ROOT, path: "akasha/raw.ts", bytes: new Uint8Array([0xff, 0xfe, 0x00]) }
  expect(reasonsIn(raw)).toEqual([])
})
