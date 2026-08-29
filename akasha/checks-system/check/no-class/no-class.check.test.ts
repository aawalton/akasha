import { expect, test } from "bun:test"
import { classesIn, reasonsIn } from "./no-class.check.code.ts"

const ROOT = "/repo"

function given(at: string, body: string) {
  return { root: ROOT, path: at, bytes: new TextEncoder().encode(body) }
}

test("a file declaring no class is let through", () => {
  expect(
    reasonsIn(given("akasha/held.ts", "export function one(): number {\n  return 1\n}\n"))
  ).toEqual([])
})

test("a class declaration is refused, and the reason names the line and the class", () => {
  const said = reasonsIn(given("akasha/held.ts", "\nexport class Held {\n  one = 1\n}\n"))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("line 2")
  expect(said[0]).toContain("`class Held`")
})

test("a class extending `Error` is let through", () => {
  const body = 'export class Refused extends Error {\n  readonly why = "no"\n}\n'
  expect(reasonsIn(given("akasha/held.ts", body))).toEqual([])
})

test("a class extending anything other than `Error` is refused, and the reason names what it extends", () => {
  const said = reasonsIn(given("akasha/held.ts", "class Held extends Corpus {}\n"))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("which extends `Corpus`")
  const dotted = classesIn("akasha/held.ts", "class One extends node.Error {}\n")
  expect(dotted[0]?.extending).toBe("node.Error")
  expect(reasonsIn(given("akasha/held.ts", "class One extends node.Error {}\n"))).toHaveLength(1)
})

test("a class expression is judged wherever a declaration would be, even extending `Error`", () => {
  const said = reasonsIn(given("akasha/held.ts", "const one = class extends Error {}\n"))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("a class expression is a class")
})

test("every class a file declares is reported, nested or at the top", () => {
  const body = "class One {}\nfunction two() {\n  class Three {}\n  return Three\n}\n"
  const said = reasonsIn(given("akasha/held.ts", body))
  expect(said).toHaveLength(2)
  expect(said[1]).toContain("line 3")
})

test("an unnamed class is named as one in the reason", () => {
  const said = reasonsIn(given("akasha/held.ts", "export default class {}\n"))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("an unnamed class")
})

test("an abstract class is a class", () => {
  expect(reasonsIn(given("akasha/held.ts", "abstract class Held {}\n"))).toHaveLength(1)
})

test("a class extending `Error` while implementing something is still let through", () => {
  const body = "class Refused extends Error implements Held {}\n"
  expect(reasonsIn(given("akasha/held.ts", body))).toEqual([])
})

test("a class named `Error` that extends nothing is refused", () => {
  expect(reasonsIn(given("akasha/held.ts", "class Error {}\n"))).toHaveLength(1)
})

test("a file that is not TypeScript is passed over", () => {
  expect(reasonsIn(given("akasha/notes.txt", "class Held {}\n"))).toEqual([])
})

test("a declaration file is judged, because its name ends in `.ts`", () => {
  expect(reasonsIn(given("akasha/held.d.ts", "declare class Held {}\n"))).toHaveLength(1)
})

test("a body that is not text is passed over rather than refused", () => {
  const held = { root: ROOT, path: "akasha/raw.ts", bytes: new Uint8Array([0xff, 0xfe, 0x00]) }
  expect(reasonsIn(held)).toEqual([])
})
