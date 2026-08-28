import { absence } from "./absence.ts"
import { arithmetic } from "./arithmetic.ts"
import { caseFormCases } from "./case-form.ts"
import { comparison } from "./comparison.ts"
import { conjunction } from "./conjunction.ts"
import { dates } from "./dates.ts"
import { fallback } from "./fallback.ts"
import { functions } from "./functions.ts"
import { neverFails } from "./never-fails.ts"
import { precedence } from "./precedence-and-grouping.ts"
import { references } from "./references.ts"
import { refusedAtRead } from "./refused-at-read.ts"
import { refusedCycle } from "./refused-cycle.ts"
import { refusedTypes } from "./refused-types-do-not-meet.ts"
import { refusedUndeclaredKey } from "./refused-undeclared-key.ts"
import { textFunction } from "./text-function.ts"
import { textLiterals } from "./text-literals.ts"
import { valueWords } from "./value-words.ts"

export type FormulaType =
  | { kind: "text" }
  | { kind: "number" }
  | { kind: "boolean" }
  | { kind: "instant" }
  | { kind: "calendar-date" }
  | { kind: "list"; of: FormulaType }

export type FormulaValue =
  | { kind: "text"; text: string }
  | { kind: "number"; number: number }
  | { kind: "boolean"; boolean: boolean }
  | { kind: "instant"; instant: string }
  | { kind: "date"; date: string }
  | { kind: "list"; list: FormulaValue[] }

export interface ShapeKey {
  type: FormulaType
  formula?: string
}

export type Shape = Record<string, ShapeKey>

export type RefusalMoment = "read" | "check"

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
      mustName?: string[]
    }

export type Citation =
  | { at: "line"; page: string; line: number }
  | { at: "absence"; page: string; section: string; names: string[] }

export function citationText(from: Citation): string {
  return from.at === "line"
    ? `${from.page}:${from.line}`
    : `${from.page} § ${from.section}, naming no ${from.names.join(" or ")}`
}

export interface FormulaCase {
  name: string
  group: CaseGroup
  from: Citation
  claim: string
  formula: string
  shape: Shape
  values: Record<string, FormulaValue>
  expected: Outcome
  now?: string
  provisional?: Provisional
}

export type Provisional =
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
  | "dates"
  | "text-function"
  | "absence"
  | "never-fails"
  | "refused-at-read"
  | "refused-undeclared-key"
  | "refused-types-do-not-meet"
  | "refused-cycle"

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
  ...dates,
  ...textFunction,
  ...absence,
  ...neverFails,
  ...refusedAtRead,
  ...refusedUndeclaredKey,
  ...refusedTypes,
  ...refusedCycle,
]
