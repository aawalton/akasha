import { afterAll, expect, test } from "bun:test"
import { reasonsIn, whatRunsIn } from "./types-file-runs-nothing.code-check.decision.code.ts"
import {
  AT,
  given,
  ROOT,
  scratch,
} from "./types-file-runs-nothing.code-check.decision.test-fixtures.ts"

afterAll(scratch.sweep)

test("a types file holding a type alias and an interface is let through", () => {
  const body =
    'import type { Page } from "@akasha/pages/page"\n\n' +
    "export type Held = Page & { named: string }\n\n" +
    "export interface Holding {\n  named: string\n}\n"
  expect(reasonsIn(given(AT, body))).toEqual([])
})

test("an export clause marked `type` is let through", () => {
  expect(reasonsIn(given(AT, "type Held = string\nexport type { Held }\n"))).toEqual([])
})

test("a named element marked `type` under a plain import clause is let through", () => {
  expect(reasonsIn(given(AT, 'import { type Held } from "./x.ts"\n'))).toEqual([])
})

test("a function is refused, and the reason names the line and the function", () => {
  const said = reasonsIn(given(AT, "\nexport function held(): number {\n  return 1\n}\n"))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("line 2")
  expect(said[0]).toContain("a function")
  expect(said[0]).toContain("nothing in a types file runs")
})

test("a variable carrying a value is refused", () => {
  const said = reasonsIn(given(AT, "export const held = 1\n"))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("a variable")
})

test("a `declare const` is refused, because a declaration file is where a value name goes", () => {
  const said = reasonsIn(given(AT, "declare const held: number\n"))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("a variable")
})

test("a class is refused", () => {
  const said = reasonsIn(given(AT, "export class Held {}\n"))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("a class")
})

test("an enum is refused", () => {
  const said = reasonsIn(given(AT, "export enum Held {\n  One,\n}\n"))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("an enum")
})

test("a namespace is refused", () => {
  const said = reasonsIn(given(AT, "declare namespace held {\n  type One = string\n}\n"))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("a namespace")
})

test("an expression run for what running it does is refused", () => {
  const said = reasonsIn(given(AT, "console.log(1)\n"))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("an expression")
})

test("an export that is not marked `type` is refused", () => {
  const said = reasonsIn(given(AT, "type Held = string\nexport { Held }\n"))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("an export that is not marked")
})

test("an import of runtime code is refused, naming the name and the source", () => {
  const said = reasonsIn(given(AT, 'import { held } from "./x.ts"\n'))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("`held`")
  expect(said[0]).toContain("`./x.ts`")
})

test("an import carrying no clause is refused as a side effect", () => {
  const said = reasonsIn(given(AT, 'import "./x.ts"\n'))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("`./x.ts`")
})

test("a refusal for an import comes before a refusal for a later line", () => {
  const said = reasonsIn(given(AT, 'import { held } from "./x.ts"\nexport const one = 1\n'))
  expect(said).toHaveLength(2)
  expect(said[0]).toContain("line 1")
  expect(said[1]).toContain("line 2")
})

test("a file that is no types file is passed over", () => {
  expect(reasonsIn(given("akasha/held.module.code.ts", "export const held = 1\n"))).toEqual([])
  expect(reasonsIn(given("akasha/held.module.ts", "export const held = 1\n"))).toEqual([])
})

test("a file that is not TypeScript is passed over", () => {
  expect(reasonsIn(given("akasha/notes.txt", "export const held = 1\n"))).toEqual([])
})

test("a body that is not text refuses rather than being passed over", () => {
  const held = { root: ROOT, path: AT, bytes: new Uint8Array([0xff, 0xfe, 0x00]) }
  expect(() => reasonsIn(held)).toThrow(AT)
  expect(() => reasonsIn(held)).toThrow("not valid UTF-8")
})

test("what was found carries the line and what that line was called", () => {
  const found = whatRunsIn(AT, "type Held = string\nexport class One {}\n")
  expect(found).toEqual([{ line: 2, called: "a class" }])
})
