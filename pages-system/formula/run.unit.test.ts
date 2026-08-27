import { expect, test } from "bun:test"
import type { Value, Values } from "./formula.ts"
import { readFormula } from "./read.ts"
import { runTree } from "./run.ts"
import type { Expression } from "./tree.ts"

const anHour = 3600000

const read = (source: string): Expression => {
  const tree = readFormula(source)
  if (!("node" in tree)) throw new Error(`refused while reading: ${tree.message}`)
  return tree
}

const values: Values = {
  now: 10 * anHour,
  properties: {
    title: { kind: "text", text: "a done deal" },
    points: { kind: "number", number: 6 },
    settled: { kind: "boolean", boolean: true },
    unsettled: { kind: "boolean", boolean: false },
    due: { kind: "instant", instant: 12 * anHour },
    day: { kind: "date", date: "2026-08-27" },
    ratio: { kind: "number", number: 1.5 },
    tags: { kind: "list", of: "text", items: [{ kind: "text", text: "urgent" }] },
  },
}

const answer = (source: string): Value => runTree(read(source), values)

const absent: Value = { kind: "absent" }

test("a literal answers itself", () => {
  expect(answer("2.5")).toEqual({ kind: "number", number: 2.5 })
  expect(answer("true")).toEqual({ kind: "boolean", boolean: true })
  expect(answer('"hi"')).toEqual({ kind: "text", text: "hi" })
  expect(answer("absent")).toEqual(absent)
})

test("a reference answers what the page holds under its key", () => {
  expect(answer("{points}")).toEqual({ kind: "number", number: 6 })
})

test("a key the page holds nothing under answers absent", () => {
  expect(answer("{missing}")).toEqual(absent)
})

test("arithmetic answers a number, and absent where it reaches one", () => {
  expect(answer("{points} + 4")).toEqual({ kind: "number", number: 10 })
  expect(answer("{points} * 2")).toEqual({ kind: "number", number: 12 })
  expect(answer("{missing} + 1")).toEqual(absent)
  expect(answer("1 + {missing}")).toEqual(absent)
})

test("a minus with nothing on its left negates what follows it", () => {
  expect(answer("-5")).toEqual({ kind: "number", number: -5 })
  expect(answer("0 - 5")).toEqual({ kind: "number", number: -5 })
  expect(answer("-{points}")).toEqual({ kind: "number", number: -6 })
  expect(answer("-{missing}")).toEqual(absent)
})

test("dividing by zero answers absent", () => {
  expect(answer("1 / 0")).toEqual(absent)
  expect(answer("0 / 0")).toEqual(absent)
  expect(answer("6 / 4")).toEqual({ kind: "number", number: 1.5 })
})

test("a comparison answers a boolean, and absent where it reaches one", () => {
  expect(answer("{points} > 5")).toEqual({ kind: "boolean", boolean: true })
  expect(answer("{points} >= 6")).toEqual({ kind: "boolean", boolean: true })
  expect(answer("{points} < 5")).toEqual({ kind: "boolean", boolean: false })
  expect(answer("{missing} < 5")).toEqual(absent)
})

test("equality answers a boolean, absent being equal only to absent", () => {
  expect(answer("{missing} == absent")).toEqual({ kind: "boolean", boolean: true })
  expect(answer("{points} == absent")).toEqual({ kind: "boolean", boolean: false })
  expect(answer("{missing} == 6")).toEqual({ kind: "boolean", boolean: false })
  expect(answer("{missing} != 6")).toEqual({ kind: "boolean", boolean: true })
  expect(answer("{points} == 6")).toEqual({ kind: "boolean", boolean: true })
})

test("equality over two lists compares their items in order", () => {
  const one: Value = { kind: "list", of: "text", items: [{ kind: "text", text: "urgent" }] }
  const other: Value = { kind: "list", of: "text", items: [{ kind: "text", text: "later" }] }
  const over = (held: Value): Value =>
    runTree(read("{tags} == {other}"), {
      now: values.now,
      properties: { tags: one, other: held },
    })
  expect(over(one)).toEqual({ kind: "boolean", boolean: true })
  expect(over(other)).toEqual({ kind: "boolean", boolean: false })
})

test("a false left answers false without working out the right", () => {
  expect(answer("false && {missing}")).toEqual({ kind: "boolean", boolean: false })
  expect(answer("{unsettled} && {missing}")).toEqual({ kind: "boolean", boolean: false })
})

test("a left that is absent answers absent, the conjunction reaching it", () => {
  expect(answer("{missing} && true")).toEqual(absent)
})

test("a true left works the right side out", () => {
  expect(answer("true && {missing}")).toEqual(absent)
  expect(answer("{settled} && false")).toEqual({ kind: "boolean", boolean: false })
  expect(answer("{settled} && true")).toEqual({ kind: "boolean", boolean: true })
})

test("the fallback answers its left, or its right where its left is absent", () => {
  expect(answer("{points} ?? 0")).toEqual({ kind: "number", number: 6 })
  expect(answer("{missing} ?? 0")).toEqual({ kind: "number", number: 0 })
  expect(answer("{missing} ?? {missing}")).toEqual(absent)
})

test("the fallback does not work out its right where its left is there", () => {
  expect(answer("{points} ?? 1 / 0")).toEqual({ kind: "number", number: 6 })
})

test("a reference in a text literal is filled where it stands", () => {
  expect(answer('"say: {title}!"')).toEqual({ kind: "text", text: "say: a done deal!" })
})

test("a boolean and a date fill a text literal as they are written", () => {
  expect(answer('"settled: {settled}"')).toEqual({ kind: "text", text: "settled: true" })
  expect(answer('"on {day}"')).toEqual({ kind: "text", text: "on 2026-08-27" })
})

test("two dates are the same value where they are the same day", () => {
  expect(answer("{day} == {day}")).toEqual({ kind: "boolean", boolean: true })
  expect(answer("{day} == {missing}")).toEqual({ kind: "boolean", boolean: false })
})

test("text writes a whole number's digits, and absent where the number is not whole", () => {
  expect(answer("text({points})")).toEqual({ kind: "text", text: "6" })
  expect(answer("text(0)")).toEqual({ kind: "text", text: "0" })
  expect(answer("text(0 - 1)")).toEqual({ kind: "text", text: "-1" })
  expect(answer("text({ratio})")).toEqual(absent)
  expect(answer("text({missing})")).toEqual(absent)
})

test("a whole number too big for its runtime's own spelling still writes as digits", () => {
  expect(answer("text(1000000000000000000000)")).toEqual({
    kind: "text",
    text: "1000000000000000000000",
  })
})

test("a text literal reaching an absent reference answers absent, and not an empty gap", () => {
  expect(answer('"say: {missing}!"')).toEqual(absent)
})

test("a text literal with no reference is never absent", () => {
  expect(answer('"steady"')).toEqual({ kind: "text", text: "steady" })
})

test("a case answers the value of the first row whose test answers true", () => {
  expect(answer('case({unsettled} -> "no", {settled} -> "yes", otherwise -> "neither")')).toEqual({
    kind: "text",
    text: "yes",
  })
})

test("a case row whose test answers absent does not match", () => {
  expect(answer('case({missing} -> "matched", otherwise -> "fell through")')).toEqual({
    kind: "text",
    text: "fell through",
  })
})

test("a case works out only the value of the row whose test passed", () => {
  expect(answer("case({settled} -> 1, otherwise -> 1 / 0)")).toEqual({ kind: "number", number: 1 })
  expect(answer("case({unsettled} -> 1 / 0, otherwise -> 2)")).toEqual({
    kind: "number",
    number: 2,
  })
})

test("now answers the moment the formula is worked out", () => {
  expect(answer("now()")).toEqual({ kind: "instant", instant: 10 * anHour })
})

test("hoursBetween answers a magnitude, whichever instant is given first", () => {
  expect(answer("hoursBetween(now(), {due})")).toEqual({ kind: "number", number: 2 })
  expect(answer("hoursBetween({due}, now())")).toEqual({ kind: "number", number: 2 })
})

test("hoursBetween answers fractions of an hour", () => {
  const half: Values = {
    now: 0,
    properties: { due: { kind: "instant", instant: anHour / 2 } },
  }
  expect(runTree(read("hoursBetween(now(), {due})"), half)).toEqual({
    kind: "number",
    number: 0.5,
  })
})

test("contains answers whether a list holds a value", () => {
  expect(answer('contains({tags}, "urgent")')).toEqual({ kind: "boolean", boolean: true })
  expect(answer('contains({tags}, "later")')).toEqual({ kind: "boolean", boolean: false })
})

test("hasWord answers whether a text holds a word, bounded at both ends", () => {
  expect(answer('hasWord({title}, "done")')).toEqual({ kind: "boolean", boolean: true })
  expect(answer('hasWord({title}, "one")')).toEqual({ kind: "boolean", boolean: false })
  expect(answer('hasWord({title}, "deal")')).toEqual({ kind: "boolean", boolean: true })
  expect(answer('hasWord({title}, "a")')).toEqual({ kind: "boolean", boolean: true })
})

test("hasWord is bounded by anything that is not a letter or a digit", () => {
  const punctuated: Values = {
    now: 0,
    properties: { title: { kind: "text", text: "well-done, truly_so 7up" } },
  }
  const held = (word: string): Value => runTree(read(`hasWord({title}, "${word}")`), punctuated)
  expect(held("done")).toEqual({ kind: "boolean", boolean: true })
  expect(held("truly")).toEqual({ kind: "boolean", boolean: true })
  expect(held("rul")).toEqual({ kind: "boolean", boolean: false })
  expect(held("7up")).toEqual({ kind: "boolean", boolean: true })
  expect(held("up")).toEqual({ kind: "boolean", boolean: false })
})

test("hasWord ignores case", () => {
  expect(answer('hasWord({title}, "Done")')).toEqual({ kind: "boolean", boolean: true })
  expect(answer('hasWord({title}, "DEAL")')).toEqual({ kind: "boolean", boolean: true })
})

test("a function reaching an absent argument answers absent", () => {
  expect(answer('hasWord({missing}, "done")')).toEqual(absent)
  expect(answer("contains({missing}, 1)")).toEqual(absent)
  expect(answer("hoursBetween(now(), {missing})")).toEqual(absent)
})

test("a formula standing on nothing at all answers absent throughout", () => {
  const nothing: Values = { now: 0, properties: {} }
  expect(runTree(read("{a} + {b}"), nothing)).toEqual(absent)
  expect(runTree(read('"{a}"'), nothing)).toEqual(absent)
  expect(runTree(read("{a} ?? {b}"), nothing)).toEqual(absent)
})
