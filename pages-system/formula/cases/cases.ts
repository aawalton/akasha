// The formula language conformance corpus.
//
// Every case here is derived from the written specification and from nothing
// else. No implementation of this language was read while writing it, as
// `pages/domain/language-conformance.domain.md:27` requires: "Hold every
// implementation to the written meaning, never to another implementation."
//
// The specification is:
//   pages/domain/formula-language.domain.md
//   pages/domain/formula-absent-value.domain.md
//   pages/list/formula-values.list.md
//   pages/list/formula-functions.list.md
//   pages/list/formula-operators.list.md
//   pages/domain/language-failure.domain.md
//   pages/domain/language-type-system.domain.md
//
// Each case names the line it comes from in `from` and quotes that line in
// `claim`, so a disagreement between an implementation and this corpus is
// settled by opening the page rather than by arguing.
//
// Where a case rests on something the pages leave out rather than on something
// they say, it carries `provisional` naming what. The case form, the call
// spelling and the parentheses that group were all provisional once and are
// now written down, so they cite the page like everything else.
//
// This file is plain data. It knows about no evaluator and imports nothing.
//
// What the specification does not settle, and so is not tested here:
//
//  1. `-` and `/` have no written associativity, so `10 - 3 - 2` is not here.
//  2. There is no unary minus in the operators list, so `-1` is not here;
//     `0 - 1` is.
//  3. Whether a function given an absent value answers absent is written for
//     operators and not for functions. One case takes the reading that it
//     does, and is marked in its comment.
//  4. Whether a number or a boolean may be filled into a text literal at all
//     is not written. What an *absent* reference does is settled, on
//     `formula-absent-value.domain.md:25`; what a present non-text one does is
//     not. One case-form case assumes it may; it is marked.
//  5. Whether `<`, `<=`, `>` and `>=` reach text is not written, so only
//     numbers are compared here.
//  6. Whether `hasWord` folds case, and what besides a space bounds a word,
//     are not written; only space-bounded, same-case cases are here.
//  7. Whether `hoursBetween(later, earlier)` is negative or a magnitude is not
//     written; every case here puts the earlier instant first.
//  8. Whether a formula may answer an instant or a list at all, and whether a
//     page type constrains what kind its `name` formula answers, are not
//     written.

import { absence } from "./absence.ts"
import { arithmetic } from "./arithmetic.ts"
import { caseFormCases } from "./case-form.ts"
import { comparison } from "./comparison.ts"
import { conjunction } from "./conjunction.ts"
import { fallback } from "./fallback.ts"
import { functions } from "./functions.ts"
import { neverFails } from "./never-fails.ts"
import { precedence } from "./precedence-and-grouping.ts"
import { references } from "./references.ts"
import { refusedAtRead } from "./refused-at-read.ts"
import { refusedCycle } from "./refused-cycle.ts"
import { refusedTypes } from "./refused-types-do-not-meet.ts"
import { refusedUndeclaredKey } from "./refused-undeclared-key.ts"
import { textLiterals } from "./text-literals.ts"
import { valueWords } from "./value-words.ts"

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/** A type a value can have. `pages/list/formula-values.list.md:15-20`. */
export type FormulaType =
  | { kind: "text" }
  | { kind: "number" }
  | { kind: "boolean" }
  | { kind: "instant" }
  | { kind: "list"; of: FormulaType }

/** A value a formula can hold. Absence is not a value: it is a key with no entry. */
export type FormulaValue =
  | { kind: "text"; text: string }
  | { kind: "number"; number: number }
  | { kind: "boolean"; boolean: boolean }
  /** ISO 8601, UTC. */
  | { kind: "instant"; instant: string }
  | { kind: "list"; list: FormulaValue[] }

/**
 * One key a page type declares. A key carrying a `formula` is a computed
 * property; `pages/domain/formula-language.domain.md:36` says a formula names
 * one exactly as it names a stored one.
 */
export interface ShapeKey {
  type: FormulaType
  formula?: string
}

/** What the page type declares. A formula is checked against this. */
export type Shape = Record<string, ShapeKey>

/**
 * Where a wrong program is caught. `pages/domain/language-failure.domain.md:15`
 * names three moments: reading it, checking what it names, running it on
 * values. `pages/domain/formula-language.domain.md:54` closes the third for
 * this language, so no case here expects a refusal at run time.
 */
export type RefusalMoment = "read" | "check"

/**
 * What was wrong. These are the corpus's names for the faults the
 * specification states; an implementation may spell its own differently, and
 * the case's `mustName` is the part `language-failure.domain.md:43` binds:
 * "Make a refusal say what was wrong and where, in the terms the program was
 * written in."
 */
export type RefusalReason =
  | "unreadable"
  | "unknown-word"
  | "unknown-operator"
  | "unknown-function"
  | "wrong-argument-count"
  | "quote-inside-text-literal"
  | "case-missing-otherwise"
  | "choice-without-a-case"
  | "value-given-a-name"
  | "undeclared-key"
  | "types-do-not-meet"
  | "formula-cycle"
  | "instant-read-outside-a-function"

export type Outcome =
  | { outcome: "value"; value: FormulaValue }
  | { outcome: "absent" }
  | {
      outcome: "refused"
      at: RefusalMoment
      reason: RefusalReason
      /** Words the refusal must carry, in the program's own terms. */
      mustName?: string[]
    }

/**
 * Where a case's claim is written.
 *
 * Nearly every claim is one line of one page, and `claim` quotes that line. A
 * few cases rest on what a page leaves out — that the operators list names no
 * `||`, that the functions list names no `upper` — and an absence is written
 * nowhere. Those name the section that would have carried it instead, and the
 * words that must not turn up among that section's entries, which is a thing a
 * reader and a test can both go and check.
 */
export type Citation =
  | { at: "line"; page: string; line: number }
  | { at: "absence"; page: string; section: string; names: string[] }

/** A citation as one string, for a failure message or a grep. */
export function citationText(from: Citation): string {
  return from.at === "line"
    ? `${from.page}:${from.line}`
    : `${from.page} § ${from.section}, naming no ${from.names.join(" or ")}`
}

export interface FormulaCase {
  /** Unique, and readable on its own in a failure line. */
  name: string
  /** Which group of the corpus this sits in. */
  group: CaseGroup
  /** Where the claim this case tests is written, or where its absence is. */
  from: Citation
  /**
   * The claim. Where `from` is a line, this quotes that line exactly, and the
   * test beside this file holds it to that. Where `from` is an absence there
   * is nothing to quote, so this states the absence in the corpus's own words.
   */
  claim: string
  /** The formula text, exactly as a page type would carry it. */
  formula: string
  /** The keys the page type declares, and their types. */
  shape: Shape
  /** The values the page holds. A key with no entry here is absent. */
  values: Record<string, FormulaValue>
  /** What the formula must do. */
  expected: Outcome
  /**
   * The instant `now()` answers, pinned. Present only where the formula calls
   * `now`. `pages/list/formula-functions.list.md:15`.
   */
  now?: string
  /**
   * Something this case rests on that the pages leave out rather than state.
   * Named so a ruling can be applied without rereading every case.
   */
  provisional?: Provisional
}

/**
 * Something this corpus reads off what the pages leave out rather than off
 * what they say, marked so every case resting on it can be found again if a
 * page comes to say otherwise.
 */
export type Provisional =
  /** That there is no list literal. Nothing spells one. */
  "no-list-literal"

export type CaseGroup =
  | "references"
  | "text-literals"
  | "value-words"
  | "arithmetic"
  | "comparison"
  | "conjunction"
  | "fallback"
  | "precedence-and-grouping"
  | "case-form"
  | "functions"
  | "absence"
  | "never-fails"
  | "refused-at-read"
  | "refused-undeclared-key"
  | "refused-types-do-not-meet"
  | "refused-cycle"

// ---------------------------------------------------------------------------
// The corpus
// ---------------------------------------------------------------------------

export const cases: FormulaCase[] = [
  ...references,
  ...textLiterals,
  ...valueWords,
  ...arithmetic,
  ...comparison,
  ...conjunction,
  ...fallback,
  ...precedence,
  ...caseFormCases,
  ...functions,
  ...absence,
  ...neverFails,
  ...refusedAtRead,
  ...refusedUndeclaredKey,
  ...refusedTypes,
  ...refusedCycle,
]
