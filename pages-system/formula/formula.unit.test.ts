import { expect, test } from "bun:test"
import {
  type Checked,
  type CheckedPageType,
  checkFormula,
  checkPageType,
  type PageType,
  type PageTypeRefused,
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

const numberType = { kind: "number" } as const
const textType = { kind: "text" } as const

const standing = (pageType: PageType): CheckedPageType => {
  const said = checkPageType(pageType)
  if (!said.ok) throw new Error(`refused: ${said.message}`)
  return said
}

const refused = (pageType: PageType): PageTypeRefused => {
  const said = checkPageType(pageType)
  if (said.ok) throw new Error("this page type was expected not to stand")
  return said
}

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
  const held = checked(
    'case(hoursBetween(now(), {due}) > 24 -> "far off", {settled} -> "settled", otherwise -> "open")'
  )
  expect([...held.reads].sort()).toEqual(["due", "settled"])
  expect(runFormula(held, values)).toEqual({ kind: "text", text: "settled" })
  expect(runFormula(held, { now: 99999999, properties: values.properties })).toEqual({
    kind: "text",
    text: "far off",
  })
})

test("a checked page type hands back the checked formula filling each computed key", () => {
  const said = standing({
    count: { type: numberType },
    doubled: { type: numberType, formula: "{count} * 2" },
  })
  expect([...said.computed.keys()]).toEqual(["doubled"])
  const over = { now: 0, properties: { count: { kind: "number", number: 6 } as Value } }
  expect(runFormula(said.computed.get("doubled") as Checked, over)).toEqual({
    kind: "number",
    number: 12,
  })
})

test("a formula answering a kind other than the type its property declares is refused", () => {
  const said = refused({
    count: { type: numberType },
    mislabelled: { type: textType, formula: "{count} + 1" },
  })
  expect(said.moment).toBe("checking")
  expect(said.keys).toEqual(["mislabelled"])
  for (const word of ["mislabelled", "text", "number"]) {
    expect(said.message).toContain(word)
  }
})

test("a formula answering the type its property declares stands", () => {
  const said = standing({
    count: { type: numberType },
    doubled: { type: numberType, formula: "{count} * 2" },
    "count-text": { type: textType, formula: "text({count})" },
    label: { type: textType, formula: '"count {count-text}"' },
  })
  expect([...said.computed.keys()].sort()).toEqual(["count-text", "doubled", "label"])
})

test("a formula that only ever answers absent meets any type its property declares", () => {
  const said = standing({
    nothing: { type: textType, formula: "absent" },
    neither: { type: numberType, formula: "absent" },
  })
  expect([...said.computed.keys()].sort()).toEqual(["neither", "nothing"])
})

test("a cycle among a page type's formulas is refused, naming every key of the ring", () => {
  const said = refused({
    first: { type: numberType, formula: "{second} + 1" },
    second: { type: numberType, formula: "{first} + 1" },
  })
  expect(said.moment).toBe("checking")
  expect([...said.keys].sort()).toEqual(["first", "second"])
  for (const word of ["first", "second"]) {
    expect(said.message).toContain(word)
  }
})

test("two paths reaching one key are a diamond rather than a ring", () => {
  const said = standing({
    count: { type: numberType },
    left: { type: numberType, formula: "{count} * 2" },
    right: { type: numberType, formula: "{count} * 3" },
    total: { type: numberType, formula: "{left} + {right}" },
  })
  expect([...said.computed.keys()].sort()).toEqual(["left", "right", "total"])
})

test("a page type is refused for a formula wrong in its text before one wrong in what it names", () => {
  const said = refused({
    unnamed: { type: numberType, formula: "{nowhere}" },
    unreadable: { type: numberType, formula: "1 +" },
  })
  expect(said.moment).toBe("reading")
  expect(said.keys).toEqual(["unreadable"])
})

test("a page type names the key whose formula was wrong", () => {
  const said = refused({ counted: { type: numberType, formula: "{nowhere}" } })
  expect(said.moment).toBe("checking")
  expect(said.keys).toEqual(["counted"])
  expect(said.message).toContain("nowhere")
})

test("a formula naming a computed key is checked against what that key declares", () => {
  const said = refused({
    label: { type: textType, formula: '"a label"' },
    counted: { type: numberType, formula: "{label} + 1" },
  })
  expect(said.moment).toBe("checking")
  expect(said.keys).toEqual(["counted"])
  expect(said.message).toContain("text")
})
