import { expect, test } from "bun:test"
import ts from "typescript"
import { lineAt, lineOf, parsedAs, skimmedAs } from "./code-source.module.code.ts"

const AT = "held.ts"

const MARKED_AT = "held.tsx"

const BODY = `const one = 1\nconst two = 2\n`

const LED = `const one = 1\n\n\nconst two = 2\n`

const MARKUP = `const one = <div />\n`

function firstOf(source: ts.SourceFile): ts.Node {
  const one = source.statements[1]
  if (one === undefined) throw new Error("the body says fewer statements than the test expects")
  return one
}

function markupIn(source: ts.SourceFile): boolean {
  let found = false
  const walk = (node: ts.Node): undefined => {
    if (ts.isJsxSelfClosingElement(node)) found = true
    ts.forEachChild(node, walk)
  }
  ts.forEachChild(source, walk)
  return found
}

test("a body is parsed under the name it is given, whether or not that file stands", () => {
  expect(parsedAs(AT, BODY).fileName).toBe(AT)
  expect(skimmedAs(AT, BODY).fileName).toBe(AT)
})

test("what is parsed can be asked what holds it, and what is skimmed cannot", () => {
  expect(firstOf(parsedAs(AT, BODY)).parent).toBeDefined()
  expect(firstOf(skimmedAs(AT, BODY)).parent).toBeUndefined()
})

test("a line is counted from one, so the first line of a body is line 1", () => {
  const source = parsedAs(AT, BODY)
  expect(lineAt(source, 0)).toBe(1)
  expect(lineOf(source, firstOf(source))).toBe(2)
})

test("a node stands where its own text starts, not where the blank leading it starts", () => {
  const source = parsedAs(AT, LED)
  const one = firstOf(source)
  expect(lineOf(source, one)).toBe(4)
  expect(lineAt(source, one.pos)).toBe(1)
})

test("a line is read the same from a skimmed body as from a parsed one", () => {
  expect(lineOf(skimmedAs(AT, LED), firstOf(skimmedAs(AT, LED)))).toBe(4)
})

test("a body named for markup is read as markup, rather than as a body that refuses it", () => {
  expect(markupIn(parsedAs(MARKED_AT, MARKUP))).toBe(true)
  expect(markupIn(skimmedAs(MARKED_AT, MARKUP))).toBe(true)
})
