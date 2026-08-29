import { expect, test } from "bun:test"
import { commentsIn, noCodeComments } from "./no-code-comments.check.code.ts"

const ROOT = "/repo"

function given(body: string) {
  return { root: ROOT, path: "akasha/held.ts", bytes: new TextEncoder().encode(body) }
}

test("a file carrying no comment is let through", () => {
  expect(noCodeComments(given('export const one = "held"\n'))).toEqual([])
})

test("a line of prose is refused, and names the line it stands on", () => {
  const body = ["export const one = 1", "// this holds the count", "export const two = 2"].join("\n")
  const said = noCodeComments(given(`${body}\n`))
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
    '/// <reference types="bun" />',
    "// @deprecated use the other one",
    "export const one = 1",
  ].join("\n")
  expect(noCodeComments(given(`${body}\n`))).toEqual([])
})

test("a form another language parses stands for nothing in a TypeScript folder", () => {
  const body = ["// shellcheck disable=SC2086", "// @noSelfInFile", "export const one = 1"].join("\n")
  expect(noCodeComments(given(`${body}\n`))).toHaveLength(2)
})

test("a directive nothing declares is told apart from prose", () => {
  const body = "// eslint-disable-next-line no-console\nexport const one = 1\n"
  const said = noCodeComments(given(body))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("a directive nothing declares")
})

test("text shaped like a comment inside a string literal is not a comment", () => {
  const body = [
    'export const one = "// not a comment"',
    "export const two = `/* nor this */`",
    "export const three = '#! nor this'",
  ].join("\n")
  expect(noCodeComments(given(`${body}\n`))).toEqual([])
})

test("text shaped like a comment inside a regex is not a comment", () => {
  const body = ["export const one = /^\\/\\/ held/", "export const two = /[/*]held/"].join("\n")
  expect(noCodeComments(given(`${body}\n`))).toEqual([])
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

test("a shebang on the first line is trivia rather than a comment", () => {
  const body = "#!/usr/bin/env bun\nexport const one = 1\n"
  expect(commentsIn("akasha/held.ts", body)).toEqual([])
  expect(noCodeComments(given(body))).toEqual([])
})

test("a form is let through only where it stands alone, never buried in prose", () => {
  const body = "/*\n * @deprecated use the other one\n * and this line is prose\n */\nexport const one = 1\n"
  expect(noCodeComments(given(body))).toHaveLength(1)
})

test("a block comment holding one declared form on its own is let through", () => {
  expect(noCodeComments(given("/** @deprecated use the other one */\nexport const one = 1\n"))).toEqual(
    []
  )
})

test("every comment a file carries is reported, one reason each", () => {
  const body = ["// one", "export const held = 1", "// two", "export const kept = 2"].join("\n")
  expect(noCodeComments(given(`${body}\n`))).toHaveLength(2)
})

test("a file that is not TypeScript is passed over", () => {
  const held = { root: ROOT, path: "akasha/notes.md", bytes: new TextEncoder().encode("// prose\n") }
  expect(noCodeComments(held)).toEqual([])
})

test("a body that is not text is passed over rather than refused", () => {
  const held = { root: ROOT, path: "akasha/raw.ts", bytes: new Uint8Array([0xff, 0xfe, 0x00]) }
  expect(noCodeComments(held)).toEqual([])
})
