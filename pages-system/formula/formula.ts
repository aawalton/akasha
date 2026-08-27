/**
 * The formula language: what a formula may say.
 *
 * What the language means is written in `pages/domain/formula-language.domain.md`
 * and the pages it requires, never here. This file is the whole of what the
 * package offers.
 *
 * There are two ways in, because the language states faults at two scales. A
 * lone formula, filling no key, is checked against the keys it may read. A page
 * type is checked whole, and only there is there a property for each formula to
 * be held to and a set of formulas for a cycle to run round. Either way, only a
 * checked formula can be run.
 */

import { checkTree, cycleAmong, otherKindThanDeclared, ringAmong } from "./check.ts"
import { readFormula } from "./read.ts"
import { runTree } from "./run.ts"
import type { Expression } from "./tree.ts"

/** A moment in time, as milliseconds since 1970-01-01T00:00:00Z. */
export type Instant = number

/**
 * A day, written `2026-08-27`.
 *
 * A date has this one spelling and no other, which is why it is written into a
 * text literal as it stands. A page type declares one under the name the pages
 * system gives it, `calendar-date`; the value under that key is a date.
 */
export type CalendarDate = string

/**
 * The kinds a list's items can be. A list holds several values of one kind.
 *
 * A date is not among them: nothing yet asks for a list of days.
 */
export type ScalarKind = "text" | "number" | "boolean" | "instant"

/** A value a formula can hold. */
export type Value =
  | { readonly kind: "text"; readonly text: string }
  | { readonly kind: "number"; readonly number: number }
  | { readonly kind: "boolean"; readonly boolean: boolean }
  | { readonly kind: "instant"; readonly instant: Instant }
  | { readonly kind: "date"; readonly date: CalendarDate }
  | { readonly kind: "list"; readonly of: ScalarKind; readonly items: readonly Value[] }
  | { readonly kind: "absent" }

/** What a page type declares a property to hold. Nothing declares absent. */
export type DeclaredType =
  | { readonly kind: "text" }
  | { readonly kind: "number" }
  | { readonly kind: "boolean" }
  | { readonly kind: "instant" }
  | { readonly kind: "date" }
  | { readonly kind: "list"; readonly of: ScalarKind }

/** What a checked formula answers. */
export type ValueType = {
  /** What it holds when it holds something; null where it only ever answers absent. */
  readonly holds: DeclaredType | null
  /** Whether working it out can answer absent. */
  readonly absent: boolean
}

/** The keys a formula may name, and what each holds. */
export type Shape = Readonly<Record<string, DeclaredType>>

/** One key a page type declares: the type it holds, and the formula filling it where it is computed. */
export type Property = {
  /** What this property holds. A formula filling it answers this and nothing else. */
  readonly type: DeclaredType
  /** The formula that fills it. A stored property has none. */
  readonly formula?: string
}

/** Every key a page type declares. */
export type PageType = Readonly<Record<string, Property>>

/** What a checked formula is run over. */
export type Values = {
  /** The moment the formula is worked out, which `now()` answers. */
  readonly now: Instant
  /** What the page holds under each key. A key with nothing under it is absent. */
  readonly properties: Readonly<Record<string, Value>>
}

/** Where in a formula's text something is. */
export type Place = {
  /** Characters from the start of the formula's text. */
  readonly offset: number
  /** Lines from the start of the formula's text, counting from one. */
  readonly line: number
  /** Characters from the start of the line, counting from one. */
  readonly column: number
}

/** A formula that cannot be run, and why. */
export type Refused = {
  readonly ok: false
  /** The moment the formula was found wrong: reading its text, or checking what it names. */
  readonly moment: "reading" | "checking"
  /** What was wrong, in the terms the formula was written in. */
  readonly message: string
  /** Where in the formula's text it was wrong. */
  readonly at: Place
}

/**
 * A page type that cannot be run, and why.
 *
 * A page type's refusal is one of its formulas' refusals, said again with the
 * key whose formula it is, since a place in a text says nothing until you know
 * which formula's text it is a place in.
 */
export type PageTypeRefused = Refused & {
  /**
   * The computed keys the fault stands in: the one key whose formula was wrong,
   * or every key of a cycle.
   */
  readonly keys: readonly string[]
}

/**
 * A formula that has passed its check.
 *
 * The class is never exported and holds its tree under a private name, so
 * nothing outside this file can make one. A formula reaches `runFormula` only
 * by way of `checkFormula` or `checkPageType`.
 */
class CheckedFormula {
  readonly ok: true = true
  readonly #tree: Expression
  /** What running this formula answers. */
  readonly type: ValueType
  /** Every key this formula names, which is where a cycle among formulas is found. */
  readonly reads: readonly string[]

  constructor(tree: Expression, type: ValueType, reads: readonly string[]) {
    this.#tree = tree
    this.type = type
    this.reads = reads
  }

  /** The tree this formula read into. */
  get tree(): Expression {
    return this.#tree
  }
}

/** A formula that has passed its check, which is the only thing that can be run. */
export type Checked = CheckedFormula

/** A page type whose every formula has passed its check. */
export type CheckedPageType = {
  readonly ok: true
  /** The checked formula filling each computed key. A stored key is not here. */
  readonly computed: ReadonlyMap<string, Checked>
}

/**
 * Read a formula's text, then check what it names against a shape.
 *
 * This holds a formula to nothing but the keys it may read, because a formula
 * reaching here fills no key and so declares no type to answer. A formula that
 * does fill one is checked by `checkPageType`.
 */
export const checkFormula = (text: string, shape: Shape): Checked | Refused => {
  const tree = readFormula(text)
  if (!("node" in tree)) return tree
  const typed = checkTree(tree, shape, text)
  if (!typed.ok) return typed
  return new CheckedFormula(tree, typed.type, typed.reads)
}

/**
 * A page type refused, placed at the start of the formula at fault.
 *
 * Both faults found here are of a whole formula rather than of a piece of one,
 * and a cycle is of no one formula at all, so there is no narrower place to
 * point at than where the formula begins.
 */
const refusePageType = (message: string, keys: readonly string[]): PageTypeRefused => ({
  ok: false,
  moment: "checking",
  message,
  at: { offset: 0, line: 1, column: 1 },
  keys,
})

/**
 * Check a page type: every computed key's formula, and then what is true of
 * those formulas together.
 *
 * The shape the formulas are checked against is read off the page type here
 * rather than passed in, so no formula can be held to a shape its own page type
 * does not declare.
 *
 * A formula wrong in its own text is reported before one wrong in what it
 * names, and a single key's fault before a cycle, which spans several.
 */
export const checkPageType = (pageType: PageType): CheckedPageType | PageTypeRefused => {
  const shape: Record<string, DeclaredType> = {}
  for (const [key, property] of Object.entries(pageType)) shape[key] = property.type

  const computed = new Map<string, Checked>()
  const wrong: PageTypeRefused[] = []
  for (const [key, property] of Object.entries(pageType)) {
    if (property.formula === undefined) continue
    const checked = checkFormula(property.formula, shape)
    if (checked.ok) computed.set(key, checked)
    else wrong.push({ ...checked, keys: [key] })
  }
  const earliest = wrong.find((one) => one.moment === "reading") ?? wrong[0]
  if (earliest !== undefined) return earliest

  for (const [key, checked] of computed) {
    const declared = (pageType[key] as Property).type
    const differs = otherKindThanDeclared(key, checked.type, declared)
    if (differs !== null) return refusePageType(differs, [key])
  }

  const reads = new Map<string, readonly string[]>()
  for (const [key, checked] of computed) reads.set(key, checked.reads)
  const ring = ringAmong(reads)
  if (ring !== null) return refusePageType(cycleAmong(ring), ring)

  return { ok: true, computed }
}

/** Work out a checked formula over values. It answers a value or absent, and never fails. */
export const runFormula = (checked: Checked, values: Values): Value => runTree(checked.tree, values)
