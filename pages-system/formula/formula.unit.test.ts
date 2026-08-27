import { expect, test } from "bun:test"
import {
  type Checked,
  checkFormula,
  runFormula,
  type Shape,
  type Value,
  type Values,
} from "./formula.ts"

const shape: Shape = {
  title: { kind: "text" },
  points: { kind: "number" },
  settled: { kind: "boolean" },
  due: { kind: "instant" },
  tags: { kind: "list", of: "text" },
}

const values: Values = {
  now: 0,
  properties: {
    title: { kind: "text", text: "a done deal" },
    points: { kind: "number", number: 6 },
    settled: { kind: "boolean", boolean: true },
    due: { kind: "instant", instant: 7200000 },
    tags: { kind: "list", of: "text", items: [{ kind: "text", text: "urgent" }] },
  },
}

const checked = (text: string): Checked => {
  const answer = checkFormula(text, shape)
  if (!answer.ok) throw new Error(`refused: ${answer.message}`)
  return answer
}

const answer = (text: string): Value => runFormula(checked(text), values)

test("a formula that passes its check reports what it answers", () => {
  expect(checked("{points} + 1").type).toEqual({ holds: { kind: "number" }, absent: true })
})

test("a formula that passes its check reports every key it names", () => {
  expect([...checked("case({settled} -> {points}, otherwise -> 0)").reads].sort()).toEqual([
    "points",
    "settled",
  ])
})

test("a formula naming no key at all reports no key", () => {
  expect(checked("1 + 1").reads).toEqual([])
})

test("a formula wrong in its text is refused at the reading moment", () => {
  const said = checkFormula("1 +", shape)
  expect(said.ok).toBe(false)
  if (said.ok) return
  expect(said.moment).toBe("reading")
})

test("a formula wrong in what it names is refused at the checking moment", () => {
  const said = checkFormula("{nowhere}", shape)
  expect(said.ok).toBe(false)
  if (said.ok) return
  expect(said.moment).toBe("checking")
  expect(said.at).toEqual({ offset: 0, line: 1, column: 1 })
})

test("a checked formula cannot be made from outside this package", () => {
  // @ts-expect-error a Checked holds its tree under a private name, so no object literal is one
  const forged: Checked = { ok: true, type: { holds: null, absent: true }, reads: [] }
  expect(forged.reads).toEqual([])
})

test("a checked formula runs over values to a value", () => {
  expect(answer("{points} * 2")).toEqual({ kind: "number", number: 12 })
  expect(answer('"{title} it is"')).toEqual({ kind: "text", text: "a done deal it is" })
})

test("one checked formula runs over many sets of values", () => {
  const once = checked("{points} ?? 0")
  expect(runFormula(once, values)).toEqual({ kind: "number", number: 6 })
  expect(runFormula(once, { now: 0, properties: {} })).toEqual({ kind: "number", number: 0 })
})

test("a formula answers a value or absent, and never fails", () => {
  const over = { now: 0, properties: {} }
  for (const text of [
    "{points} / 0",
    '"{title}"',
    "hoursBetween(now(), {due})",
    'contains({tags}, "urgent")',
    "case({settled} -> {points}, otherwise -> 0)",
    "{points} > 3 && {settled}",
  ]) {
    expect(() => runFormula(checked(text), over)).not.toThrow()
  }
})

test("a formula reads as a stranger would take it, down the whole precedence ladder", () => {
  expect(answer("1 + 2 * 3")).toEqual({ kind: "number", number: 7 })
  expect(answer("(1 + 2) * 3")).toEqual({ kind: "number", number: 9 })
  expect(answer("1 + 2 * 3 == 7 && true")).toEqual({ kind: "boolean", boolean: true })
})

test("a whole formula of the kind a page type would carry works out", () => {
  const standing = checked(
    'case(hoursBetween(now(), {due}) > 24 -> "far off", {settled} -> "settled", otherwise -> "open")'
  )
  expect([...standing.reads].sort()).toEqual(["due", "settled"])
  expect(runFormula(standing, values)).toEqual({ kind: "text", text: "settled" })
  expect(runFormula(standing, { now: 99999999, properties: values.properties })).toEqual({
    kind: "text",
    text: "far off",
  })
})
