import { expect, test } from "bun:test"
import {
  commentsIn,
  couldCarryOne,
  found,
  styleCommentsIn,
} from "akasha/check/code/pages/no-code-comments/no-code-comments.check-code.decision.code.ts"
import {
  AT,
  STYLE_AT,
} from "akasha/check/code/pages/no-code-comments/no-code-comments.check-code.decision.test-fixtures.ts"

test("a file carrying no comment is let through", () => {
  expect(found(AT, 'export const one = "held"\n')).toEqual([])
})

test("a line of prose is refused, and names the line it sits on", () => {
  const body = ["export const one = 1", "// this holds the count", "export const two = 2"].join(
    "\n"
  )
  const said = found(AT, `${body}\n`)
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("line 2")
  expect(said[0]).toContain("prose")
})

test("a block of prose is refused once rather than once a line", () => {
  const said = found(AT, "/*\n * one\n * two\n */\nexport const one = 1\n")
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
  expect(found(AT, `${body}\n`)).toEqual([])
})

test("a form another language parses represents nothing in a TypeScript folder", () => {
  const body = ["// shellcheck disable=SC2086", "// @noSelfInFile", "export const one = 1"].join(
    "\n"
  )
  expect(found(AT, `${body}\n`)).toHaveLength(2)
})

test("a directive nothing declares is told apart from prose", () => {
  const body = "// eslint-disable-next-line no-console\nexport const one = 1\n"
  const said = found(AT, body)
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("a directive nothing declares")
})

test("text shaped like a comment inside a string literal is not a comment", () => {
  const body = [
    'export const one = "// not a comment"',
    "export const two = `/* nor this */`",
    "export const three = '#! nor this'",
  ].join("\n")
  expect(found(AT, `${body}\n`)).toEqual([])
})

test("text shaped like a comment inside a regex is not a comment", () => {
  const body = ["export const one = /^\\/\\/ held/", "export const two = /[/*]held/"].join("\n")
  expect(found(AT, `${body}\n`)).toEqual([])
})

test("a comment trailing code on the same line is found", () => {
  const said = found(AT, "export const one = 1 // the count\n")
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("line 1")
})

test("a comment after the last statement is found", () => {
  const said = found(AT, "export const one = 1\n// nothing follows this\n")
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("line 2")
})

test("a shebang on the first line is trivia rather than a comment", () => {
  const body = "#!/usr/bin/env bun\nexport const one = 1\n"
  expect(commentsIn(AT, body)).toEqual([])
  expect(found(AT, body)).toEqual([])
})

test("a form is let through only where it is alone, never buried in prose", () => {
  const body =
    "/*\n * @deprecated use the other one\n * and this line is prose\n */\nexport const one = 1\n"
  expect(found(AT, body)).toHaveLength(1)
})

test("a block comment holding one declared form on its own is let through", () => {
  expect(found(AT, "/** @deprecated use the other one */\nexport const one = 1\n")).toEqual([])
})

test("every comment a file carries is reported, one reason each", () => {
  const body = ["// one", "export const held = 1", "// two", "export const kept = 2"].join("\n")
  expect(found(AT, `${body}\n`)).toHaveLength(2)
})

test("a stylesheet carrying no comment is let through", () => {
  expect(found(STYLE_AT, ".held {\n  color: red;\n}\n")).toEqual([])
})

test("prose in a stylesheet is refused, and names the line it sits on", () => {
  const body = [".held {", "  /* this holds the color */", "  color: red;", "}"].join("\n")
  const said = found(STYLE_AT, `${body}\n`)
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("line 2")
  expect(said[0]).toContain("prose")
})

test("a block of prose in a stylesheet is refused once rather than once a line", () => {
  const said = found(STYLE_AT, "/*\n one\n two\n*/\n.held {\n  color: red;\n}\n")
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("line 1")
})

test("a comment after a stylesheet rule names the line it sits on", () => {
  const said = found(STYLE_AT, ".held {\n  color: red;\n}\n/* nothing follows */\n")
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("line 4")
})

test("text shaped like a comment inside a stylesheet string is not a comment", () => {
  const body = [".held::after {", '  content: "/* not a comment */";', "}"].join("\n")
  expect(found(STYLE_AT, `${body}\n`)).toEqual([])
})

test("a quote escaped inside a stylesheet string leaves the string open", () => {
  const body = [".held::after {", '  content: "a \\" /* not a comment */ b";', "}"].join("\n")
  expect(styleCommentsIn(`${body}\n`)).toEqual([])
})

test("a stylesheet comment never closed is read to the end of the body", () => {
  const said = styleCommentsIn(".held {\n  color: red;\n}\n/* opened and left open\n")
  expect(said).toHaveLength(1)
  expect(said[0]?.line).toBe(4)
})

test("a suppression a stylesheet linter parses is let through", () => {
  const body = ["/* biome-ignore lint/suspicious/noEmptyBlock: held */", ".held {", "}"].join("\n")
  expect(found(STYLE_AT, `${body}\n`)).toEqual([])
})

test("every comment a stylesheet carries is reported, one reason each", () => {
  const body = ["/* one */", ".held {", "  color: red;", "}", "/* two */"].join("\n")
  expect(found(STYLE_AT, `${body}\n`)).toHaveLength(2)
})

test("a body whose every slash sits inside a string carries no comment and is parsed by nothing", () => {
  const body = 'export const AT = "https://example.com//held"\n'
  expect(couldCarryOne(AT, body)).toBe(false)
  expect(found(AT, body)).toEqual([])
})

test("a comment past a string, a template or a regex carrying slashes is still found", () => {
  const each = [
    'export const AT = "https://example.com" // held',
    "export const AT = `https://one/${two}//three` // held",
    "export const AT = /['\"]/ // held",
    'export const AT = "a ` b" // held',
    "export const AT = `${1 /* held */}`",
  ]
  for (const one of each) {
    expect(couldCarryOne(AT, `${one}\n`)).toBe(true)
    expect(found(AT, `${one}\n`)).toHaveLength(1)
  }
})

test("a body read as JSX is parsed rather than scanned", () => {
  expect(couldCarryOne("one/one.module.code.tsx", 'export const AT = "held"\n')).toBe(true)
})
