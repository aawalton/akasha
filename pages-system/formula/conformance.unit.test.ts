/**
 * The conformance corpus, run against this evaluator.
 *
 * `cases/cases.ts` is plain data written from the specification alone, bound to
 * no function. This file is the binding: it turns each case into a call on
 * `checkFormula` and `runFormula`, and holds the answer against what the case
 * says. A failure names the case and the line the claim is written on, so a
 * disagreement is settled by opening the page rather than by reading either
 * side's code.
 *
 * Two things a case asks for stand outside `checkFormula`, which is given a
 * shape of declared types and never sees another key's formula. Both are built
 * here, over what a checked formula already offers:
 *
 *  - A page type's check, which is every computed key's own formula checked,
 *    and then a cycle looked for among what those formulas read. `Checked.reads`
 *    is what that is looked for in.
 *  - A computed key's value, worked out before the formula under test is run
 *    and put under its key, so a formula names a computed key exactly as it
 *    names a stored one.
 */

import { expect, test } from "bun:test"
import type {
  FormulaCase,
  FormulaType,
  FormulaValue,
  Shape as CaseShape,
} from "./cases/cases.ts"
import { cases, citationText } from "./cases/cases.ts"
import type { Checked, DeclaredType, Refused, ScalarKind, Shape, Value } from "./formula.ts"
import { checkFormula, runFormula } from "./formula.ts"

// ---------------------------------------------------------------------------
// What a case says, in the terms the evaluator takes
// ---------------------------------------------------------------------------

/** The kind a list's items are. The corpus nests a type here; the evaluator does not. */
const scalarKindOf = (type: FormulaType): ScalarKind => {
  if (type.kind === "list") throw new Error("a list of lists is no declared type")
  return type.kind
}

const declaredTypeOf = (type: FormulaType): DeclaredType =>
  type.kind === "list" ? { kind: "list", of: scalarKindOf(type.of) } : { kind: type.kind }

/** The keys a case's page type declares, without their formulas. */
const shapeOf = (shape: CaseShape): Shape =>
  Object.fromEntries(
    Object.entries(shape).map(([key, declared]) => [key, declaredTypeOf(declared.type)])
  )

/** A value the case gives, with an instant read off its ISO spelling. */
const valueOf = (given: FormulaValue, declared: DeclaredType | undefined): Value => {
  switch (given.kind) {
    case "text":
      return { kind: "text", text: given.text }
    case "number":
      return { kind: "number", number: given.number }
    case "boolean":
      return { kind: "boolean", boolean: given.boolean }
    case "instant":
      return { kind: "instant", instant: Date.parse(given.instant) }
    case "list": {
      const of =
        declared !== undefined && declared.kind === "list"
          ? declared.of
          : ((given.list[0]?.kind ?? "text") as ScalarKind)
      return { kind: "list", of, items: given.list.map((item) => valueOf(item, undefined)) }
    }
  }
}

/** The moment the corpus names, in the evaluator's spelling. */
const momentOf = (refused: Refused): "read" | "check" =>
  refused.moment === "reading" ? "read" : "check"

// ---------------------------------------------------------------------------
// The page type's check, which `checkFormula` is one formula of
// ---------------------------------------------------------------------------

/** A refusal made here rather than by the evaluator, for a cycle it cannot see. */
const cycleRefusal = (ring: readonly string[]): Refused => ({
  ok: false,
  moment: "checking",
  message: `a cycle among the formulas of ${ring.map((key) => `\`${key}\``).join(", ")}`,
  at: { offset: 0, line: 1, column: 1 },
})

/** The first ring among the computed keys, following what each formula reads. */
const ringAmong = (computed: ReadonlyMap<string, Checked>): readonly string[] | null => {
  const open: string[] = []
  const shut = new Set<string>()
  const walk = (key: string): readonly string[] | null => {
    const standing = open.indexOf(key)
    if (standing !== -1) return open.slice(standing)
    if (shut.has(key)) return null
    const checked = computed.get(key)
    if (checked === undefined) return null
    open.push(key)
    for (const read of checked.reads) {
      const ring = walk(read)
      if (ring !== null) return ring
    }
    open.pop()
    shut.add(key)
    return null
  }
  for (const key of computed.keys()) {
    const ring = walk(key)
    if (ring !== null) return ring
  }
  return null
}

type PageType =
  | { readonly ok: true; readonly computed: ReadonlyMap<string, Checked> }
  | { readonly ok: false; readonly reading: Refused | null; readonly checking: Refused | null }

/** Every computed key's formula checked, and then the ring looked for. */
const checkPageType = (given: CaseShape): PageType => {
  const shape = shapeOf(given)
  const computed = new Map<string, Checked>()
  let reading: Refused | null = null
  let checking: Refused | null = null
  for (const [key, declared] of Object.entries(given)) {
    if (declared.formula === undefined) continue
    const checked = checkFormula(declared.formula, shape)
    if (checked.ok) {
      computed.set(key, checked)
      continue
    }
    if (checked.moment === "reading") reading = reading ?? checked
    else checking = checking ?? checked
  }
  if (reading !== null || checking !== null) return { ok: false, reading, checking }
  const ring = ringAmong(computed)
  if (ring !== null) return { ok: false, reading: null, checking: cycleRefusal(ring) }
  return { ok: true, computed }
}

/** What the page holds, with every computed key worked out and put under its key. */
const propertiesFor = (
  one: FormulaCase,
  computed: ReadonlyMap<string, Checked>,
  now: number
): Readonly<Record<string, Value>> => {
  const shape = shapeOf(one.shape)
  const properties: Record<string, Value> = {}
  for (const [key, given] of Object.entries(one.values)) {
    properties[key] = valueOf(given, shape[key])
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

// ---------------------------------------------------------------------------
// What each side did, written the same way so the two can be held together
// ---------------------------------------------------------------------------

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
    case "list":
      return `list [${value.items.map(wordFor).join(", ")}]`
  }
}

const wordForGiven = (given: FormulaValue): string => wordFor(valueOf(given, undefined))

/** What the case says must happen. */
const wanted = (one: FormulaCase): string => {
  if (one.expected.outcome === "absent") return "absent"
  if (one.expected.outcome === "value") return wordForGiven(one.expected.value)
  return `refused at ${one.expected.at}`
}

type Answer = { readonly refused: Refused } | { readonly value: Value }

/** The evaluator's own answer, read at the moment the earliest fault is found. */
const answer = (one: FormulaCase): Answer => {
  const shape = shapeOf(one.shape)
  const checked = checkFormula(one.formula, shape)
  if (!checked.ok && checked.moment === "reading") return { refused: checked }
  const pageType = checkPageType(one.shape)
  if (!pageType.ok && pageType.reading !== null) return { refused: pageType.reading }
  if (!checked.ok) return { refused: checked }
  if (!pageType.ok) return { refused: pageType.checking as Refused }
  const now = one.now === undefined ? 0 : Date.parse(one.now)
  return { value: runFormula(checked, { now, properties: propertiesFor(one, pageType.computed, now) }) }
}

/**
 * What the evaluator did. A refusal at the moment the case asked for is written
 * as that moment alone; any other refusal carries its message, so a failure
 * says what the evaluator objected to.
 */
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
