import { expect, test } from "bun:test"
import type { Shape as CaseShape, FormulaCase, FormulaType, FormulaValue } from "./cases/cases.ts"
import { cases, citationText } from "./cases/cases.ts"
import type {
  Checked,
  DeclaredType,
  PageType,
  Refused,
  ScalarKind,
  Shape,
  Value,
} from "./formula.ts"
import { checkFormula, checkPageType, runFormula } from "./formula.ts"

const scalarKindOf = (type: FormulaType): ScalarKind => {
  if (type.kind === "list") throw new Error("a list of lists is no declared type")
  if (type.kind === "calendar-date") throw new Error("a list of dates is no declared type")
  return type.kind
}

const declaredTypeOf = (type: FormulaType): DeclaredType => {
  if (type.kind === "list") return { kind: "list", of: scalarKindOf(type.of) }
  if (type.kind === "calendar-date") return { kind: "date" }
  return { kind: type.kind }
}

const shapeOf = (shape: CaseShape): Shape =>
  Object.fromEntries(
    Object.entries(shape).map(([key, declared]) => [key, declaredTypeOf(declared.type)])
  )

const pageTypeOf = (shape: CaseShape): PageType =>
  Object.fromEntries(
    Object.entries(shape).map(([key, declared]) => [
      key,
      declared.formula === undefined
        ? { type: declaredTypeOf(declared.type) }
        : { type: declaredTypeOf(declared.type), formula: declared.formula },
    ])
  )

const valueFor = (given: FormulaValue, declared: DeclaredType | undefined): Value => {
  switch (given.kind) {
    case "text":
      return { kind: "text", text: given.text }
    case "number":
      return { kind: "number", number: given.number }
    case "boolean":
      return { kind: "boolean", boolean: given.boolean }
    case "instant":
      return { kind: "instant", instant: Date.parse(given.instant) }
    case "date":
      return { kind: "date", date: given.date }
    case "list": {
      const of =
        declared !== undefined && declared.kind === "list"
          ? declared.of
          : ((given.list[0]?.kind ?? "text") as ScalarKind)
      return { kind: "list", of, items: given.list.map((item) => valueFor(item, undefined)) }
    }
  }
}

const momentOf = (refused: Refused): "read" | "check" =>
  refused.moment === "reading" ? "read" : "check"

const propertiesFor = (
  one: FormulaCase,
  computed: ReadonlyMap<string, Checked>,
  now: number
): Readonly<Record<string, Value>> => {
  const shape = shapeOf(one.shape)
  const properties: Record<string, Value> = {}
  for (const [key, given] of Object.entries(one.values)) {
    properties[key] = valueFor(given, shape[key])
  }
  const order: string[] = []
  const seen = new Set<string>()
  const visit = (key: string): void => {
    if (seen.has(key)) return
    seen.add(key)
    const checked = computed.get(key)
    if (checked === undefined) return
    for (const read of checked.reads) visit(read)
    order.push(key)
  }
  for (const key of computed.keys()) visit(key)
  for (const key of order) {
    const checked = computed.get(key) as Checked
    const value = runFormula(checked, { now, properties })
    if (value.kind !== "absent") properties[key] = value
  }
  return properties
}

const wordFor = (value: Value): string => {
  switch (value.kind) {
    case "absent":
      return "absent"
    case "text":
      return `text ${JSON.stringify(value.text)}`
    case "number":
      return `number ${value.number}`
    case "boolean":
      return `boolean ${value.boolean}`
    case "instant":
      return `instant ${new Date(value.instant).toISOString()}`
    case "date":
      return `date ${value.date}`
    case "list":
      return `list [${value.items.map(wordFor).join(", ")}]`
  }
}

const wordForGiven = (given: FormulaValue): string => wordFor(valueFor(given, undefined))

const wanted = (one: FormulaCase): string => {
  if (one.expected.outcome === "absent") return "absent"
  if (one.expected.outcome === "value") return wordForGiven(one.expected.value)
  return `refused at ${one.expected.at}`
}

type Answer = { readonly refused: Refused } | { readonly value: Value }

const answer = (one: FormulaCase): Answer => {
  const checked = checkFormula(one.formula, shapeOf(one.shape))
  if (!checked.ok && checked.moment === "reading") return { refused: checked }
  const pageType = checkPageType(pageTypeOf(one.shape))
  if (!pageType.ok && pageType.moment === "reading") return { refused: pageType }
  if (!checked.ok) return { refused: checked }
  if (!pageType.ok) return { refused: pageType }
  const now = one.now === undefined ? 0 : Date.parse(one.now)
  return {
    value: runFormula(checked, { now, properties: propertiesFor(one, pageType.computed, now) }),
  }
}

const did = (one: FormulaCase, given: Answer): string => {
  if ("value" in given) return wordFor(given.value)
  const moment = momentOf(given.refused)
  const asked = one.expected.outcome === "refused" && one.expected.at === moment
  return asked ? `refused at ${moment}` : `refused at ${moment} — ${given.refused.message}`
}

for (const one of cases) {
  test(one.name, () => {
    const given = answer(one)
    expect({ where: citationText(one.from), did: did(one, given) }).toEqual({
      where: citationText(one.from),
      did: wanted(one),
    })
    if (one.expected.outcome !== "refused" || one.expected.mustName === undefined) return
    if (!("refused" in given)) return
    for (const word of one.expected.mustName) {
      expect(given.refused.message).toContain(word)
    }
  })
}
