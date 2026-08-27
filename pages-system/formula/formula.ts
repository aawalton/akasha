/**
 * The formula language: what a formula may say.
 *
 * What the language means is written in `pages/domain/formula-language.domain.md`
 * and the pages it requires, never here. This file is the whole of what the
 * package offers: a formula is checked against a shape, and only a checked
 * formula can be run over values.
 */

import { checkTree } from "./check.ts"
import { readFormula } from "./read.ts"
import { runTree } from "./run.ts"
import type { Expression } from "./tree.ts"

/** A moment in time, as milliseconds since 1970-01-01T00:00:00Z. */
export type Instant = number

/** The kinds a list's items can be. A list holds several values of one kind. */
export type ScalarKind = "text" | "number" | "boolean" | "instant"

/** A value a formula can hold. */
export type Value =
  | { readonly kind: "text"; readonly text: string }
  | { readonly kind: "number"; readonly number: number }
  | { readonly kind: "boolean"; readonly boolean: boolean }
  | { readonly kind: "instant"; readonly instant: Instant }
  | { readonly kind: "list"; readonly of: ScalarKind; readonly items: readonly Value[] }
  | { readonly kind: "absent" }

/** What a page type declares a property to hold. Nothing declares absent. */
export type DeclaredType =
  | { readonly kind: "text" }
  | { readonly kind: "number" }
  | { readonly kind: "boolean" }
  | { readonly kind: "instant" }
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
 * A formula that has passed its check.
 *
 * The class is never exported and holds its tree under a private name, so
 * nothing outside this file can make one. A formula reaches `runFormula` only
 * by way of `checkFormula`.
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

/** Read a formula's text, then check what it names against a shape. */
export const checkFormula = (text: string, shape: Shape): Checked | Refused => {
  const tree = readFormula(text)
  if (!("node" in tree)) return tree
  const typed = checkTree(tree, shape, text)
  if (!typed.ok) return typed
  return new CheckedFormula(tree, typed.type, typed.reads)
}

/** Work out a checked formula over values. It answers a value or absent, and never fails. */
export const runFormula = (checked: Checked, values: Values): Value => runTree(checked.tree, values)
