import { expect, test } from "bun:test"
import type { Refused } from "./formula.ts"
import { readFormula } from "./read.ts"
import type { Expression } from "./tree.ts"

const tree = (source: string): Expression => {
  const read = readFormula(source)
  if (!("node" in read)) throw new Error(`refused: ${read.message}`)
  return read
}

const refusal = (source: string): Refused => {
  const read = readFormula(source)
  if ("node" in read) throw new Error("it was read, and a refusal was expected")
  return read
}

test("a key between braces reads as a reference to that key", () => {
  expect(tree("{total-points}")).toEqual({ node: "reference", key: "total-points", at: 0 })
})

test("a text literal reads as its characters and the references standing in it", () => {
  expect(tree('"Hi {name}!"')).toEqual({
    node: "text",
    at: 0,
    parts: [
      { part: "characters", characters: "Hi " },
      { part: "reference", key: "name", at: 4 },
      { part: "characters", characters: "!" },
    ],
  })
})

test("a text literal with no reference in it reads as one run of characters", () => {
  expect(tree('"plain"')).toEqual({
    node: "text",
    at: 0,
    parts: [{ part: "characters", characters: "plain" }],
  })
})

test("a number reads whole or fractional", () => {
  expect(tree("12")).toMatchObject({ node: "number", number: 12 })
  expect(tree("1.5")).toMatchObject({ node: "number", number: 1.5 })
})

test("true, false and absent are the only words standing for a value", () => {
  expect(tree("true")).toMatchObject({ node: "boolean", boolean: true })
  expect(tree("false")).toMatchObject({ node: "boolean", boolean: false })
  expect(tree("absent")).toMatchObject({ node: "absent" })
  expect(refusal("maybe").message).toContain("`maybe` is no value")
})

test("multiplication binds tighter than addition", () => {
  expect(tree("1 + 2 * 3")).toMatchObject({
    node: "operation",
    operator: "+",
    left: { node: "number", number: 1 },
    right: { node: "operation", operator: "*" },
  })
})

test("addition binds tighter than comparison", () => {
  expect(tree("1 + 2 < 4")).toMatchObject({ node: "operation", operator: "<" })
})

test("comparison binds tighter than the conjunction", () => {
  expect(tree("1 < 2 && 3 < 4")).toMatchObject({
    node: "operation",
    operator: "&&",
    left: { operator: "<" },
    right: { operator: "<" },
  })
})

test("the conjunction binds tighter than the fallback, which is loosest", () => {
  expect(tree("{a} ?? true && false")).toMatchObject({
    node: "operation",
    operator: "??",
    right: { operator: "&&" },
  })
})

test("addition joins from the left", () => {
  expect(tree("1 - 2 - 3")).toMatchObject({
    operator: "-",
    left: { operator: "-", left: { number: 1 }, right: { number: 2 } },
    right: { number: 3 },
  })
})

test("parentheses group what would otherwise bind looser", () => {
  expect(tree("(1 + 2) * 3")).toMatchObject({
    node: "operation",
    operator: "*",
    left: { operator: "+" },
    right: { number: 3 },
  })
})

test("a case reads its rows and the value its otherwise row answers", () => {
  expect(tree('case({ram} == "64gb" -> 6400, otherwise -> 0)')).toMatchObject({
    node: "case",
    rows: [
      {
        test: { node: "operation", operator: "==" },
        value: { node: "number", number: 6400 },
      },
    ],
    otherwise: { node: "number", number: 0 },
  })
})

test("a case reads the same across lines as it does on one", () => {
  const many = "case(\n  {a} -> 1,\n  {b} -> 2,\n  otherwise -> 3\n)"
  expect(tree(many)).toMatchObject({ node: "case", rows: [{}, {}] })
})

test("a case row's value can itself be a case", () => {
  expect(tree("case({a} -> case({b} -> 1, otherwise -> 2), otherwise -> 3)")).toMatchObject({
    node: "case",
    rows: [{ value: { node: "case" } }],
    otherwise: { number: 3 },
  })
})

test("a call reads its name and its arguments between parentheses", () => {
  expect(tree("hoursBetween(now(), {due})")).toMatchObject({
    node: "call",
    name: "hoursBetween",
    arguments: [
      { node: "call", name: "now", arguments: [] },
      { node: "reference", key: "due" },
    ],
  })
})

test("case is a keyword before a word followed by a parenthesis is a call", () => {
  expect(tree("case(true -> 1, otherwise -> 2)")).toMatchObject({ node: "case" })
})

test("a refusal says where in the text it was wrong, as a line and a column", () => {
  const said = refusal("1 +\n  &")
  expect(said.moment).toBe("reading")
  expect(said.at).toEqual({ offset: 6, line: 2, column: 3 })
})

test("a property key opened and never closed is refused", () => {
  expect(refusal("{name").message).toContain("never closed")
})

test("a property key with nothing between its braces is refused", () => {
  expect(refusal("{}").message).toContain("empty between its braces")
})

test("a text literal opened and never closed is refused", () => {
  expect(refusal('"unfinished').message).toContain("never closed")
})

test("a comparison following a comparison is refused", () => {
  expect(refusal("1 < 2 < 3").message).toContain("cannot follow a comparison")
})

test("a minus with nothing on its left negates, and one with a value subtracts", () => {
  expect(tree("-5")).toMatchObject({ node: "negation", of: { node: "number", number: 5 } })
  expect(tree("-{count}")).toMatchObject({ node: "negation", of: { node: "reference" } })
  expect(tree("{a} - 1")).toMatchObject({ node: "operation", operator: "-" })
})

test("negation binds tighter than multiplication", () => {
  expect(tree("-{a} * {b}")).toMatchObject({
    node: "operation",
    operator: "*",
    left: { node: "negation" },
    right: { node: "reference", key: "b" },
  })
  expect(tree("{a} * -1")).toMatchObject({
    operator: "*",
    right: { node: "negation", of: { number: 1 } },
  })
})

test("a case with no otherwise row is refused", () => {
  expect(refusal("case({a} -> 1)").message).toContain("every case ends with an `otherwise` row")
})

test("a row after the otherwise row is refused", () => {
  expect(refusal("case({a} -> 1, otherwise -> 2, {b} -> 3)").message).toContain("last row")
})

test("a case whose only row is its otherwise row reads", () => {
  expect(tree("case(otherwise -> 1)")).toMatchObject({
    node: "case",
    rows: [],
    otherwise: { node: "number", number: 1 },
  })
})

test("a case row written with a bare word other than otherwise names otherwise", () => {
  expect(refusal("case({a} -> 1, else -> 2)").message).toContain("otherwise")
})

test("a single equals is refused, naming the operator that was meant", () => {
  expect(refusal("{a} = 1").message).toContain("write `==`")
})

test("there is no not, and the refusal names what to write instead", () => {
  expect(refusal("!{a}").message).toContain("== false")
})

test("there is no or, and the refusal names the case", () => {
  expect(refusal("{a} || {b}").message).toContain("case")
})

test("an empty formula is refused", () => {
  expect(refusal("   ").message).toContain("no expression")
})

test("anything following a complete formula is refused", () => {
  expect(refusal("1 2").message).toContain("the formula is complete")
})

test("otherwise outside a case is refused", () => {
  expect(refusal("otherwise").message).toContain("no case is open here")
})
