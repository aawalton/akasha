import { expect, test } from "bun:test"
import { noCodeComments } from "./no-code-comments.check.code.ts"

const ROOT = "/repo/akasha"

function given(body: string) {
  return { root: ROOT, path: `${ROOT}/held.ts`, bytes: Buffer.from(body, "utf8") }
}

test("a file carrying no comment is let through", () => {
  expect(noCodeComments(given('export const one = "held"\n'))).toEqual([])
})

test("a line of prose is refused, and names the line it stands on", () => {
  const said = noCodeComments(given('export const one = 1\n// this holds the count\nexport const two = 2\n'))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("line 2")
  expect(said[0]).toContain("prose")
})

test("a block of prose is refused once rather than once a line", () => {
  const said = noCodeComments(given("/*\n * one\n * two\n */\nexport const one = 1\n"))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("line 1")
})

test("a declared form is let through", () => {
  const body = [
    "// @ts-expect-error the call is wrong on purpose",
    "// biome-ignore lint/style/noVar: held",
    "/// <reference types=\"bun\" />",
    "// @deprecated use the other one",
    "export const one = 1",
  ].join("\n")
  expect(noCodeComments(given(body))).toEqual([])
})

test("a form another language parses stands for nothing in a TypeScript folder", () => {
  const body = ["// shellcheck disable=SC2086", "// @noSelfInFile", "export const one = 1"].join("\n")
  expect(noCodeComments(given(body))).toHaveLength(2)
})

test("a directive nothing declares is told apart from prose", () => {
  const said = noCodeComments(given("// eslint-disable-next-line no-console\nexport const one = 1\n"))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("a directive nothing declares")
})

test("text shaped like a comment inside a string literal is not a comment", () => {
  const body = [
    'export const one = "// not a comment"',
    "export const two = `/* nor this */`",
    "export const three = '#! nor this'",
  ].join("\n")
  expect(noCodeComments(given(body))).toEqual([])
})

test("text shaped like a comment inside a regex is not a comment", () => {
  const body = ["export const one = /^\\/\\/ held/", "export const two = /[/*]held/"].join("\n")
  expect(noCodeComments(given(body))).toEqual([])
})

test("a comment trailing code on the same line is found", () => {
  const said = noCodeComments(given("export const one = 1 // the count\n"))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("line 1")
})

test("a comment standing after the last statement is found", () => {
  const said = noCodeComments(given("export const one = 1\n// nothing follows this\n"))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("line 2")
})

test("a body that is not text is passed over rather than refused", () => {
  const held = { root: ROOT, path: `${ROOT}/raw.ts`, bytes: new Uint8Array([0xff, 0xfe, 0x00]) }
  expect(noCodeComments(held)).toEqual([])
})
