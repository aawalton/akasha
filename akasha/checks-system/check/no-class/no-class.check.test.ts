import { expect, test } from "bun:test"
import { classesIn, noClass } from "./no-class.check.code.ts"

const ROOT = "/repo/akasha"

function given(at: string, body: string) {
  return { root: ROOT, path: `${ROOT}/${at}`, bytes: Buffer.from(body, "utf8") }
}

test("a file declaring no class is let through", () => {
  expect(noClass(given("held.ts", "export function one(): number {\n  return 1\n}\n"))).toEqual([])
})

test("a class declaration is refused, and the reason names the line and the class", () => {
  const said = noClass(given("held.ts", "\nexport class Held {\n  one = 1\n}\n"))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("line 2")
  expect(said[0]).toContain("`class Held`")
})

test("a class extending `Error` is let through", () => {
  const body = 'export class Refused extends Error {\n  readonly why = "no"\n}\n'
  expect(noClass(given("held.ts", body))).toEqual([])
})

test("a class extending anything other than `Error` is refused, and the reason names what it extends", () => {
  const said = noClass(given("held.ts", "class Held extends Corpus {}\n"))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("which extends `Corpus`")
  const dotted = classesIn("held.ts", "class One extends node.Error {}\n")
  expect(dotted[0]?.extending).toBe("node.Error")
  expect(noClass(given("held.ts", "class One extends node.Error {}\n"))).toHaveLength(1)
})

test("a class expression is judged wherever a declaration would be, even extending `Error`", () => {
  const said = noClass(given("held.ts", "const one = class extends Error {}\n"))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("a class expression is a class")
})

test("every class a file declares is reported, nested or at the top", () => {
  const body = "class One {}\nfunction two() {\n  class Three {}\n  return Three\n}\n"
  const said = noClass(given("held.ts", body))
  expect(said).toHaveLength(2)
  expect(said[1]).toContain("line 3")
})

test("a file that is not TypeScript is passed over", () => {
  expect(noClass(given("notes.txt", "class Held {}\n"))).toEqual([])
})

test("a body that is not text is passed over rather than refused", () => {
  const held = { root: ROOT, path: `${ROOT}/raw.ts`, bytes: new Uint8Array([0xff, 0xfe, 0x00]) }
  expect(noClass(held)).toEqual([])
})
