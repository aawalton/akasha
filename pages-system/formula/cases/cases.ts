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
// Spellings the specification does not settle
// ---------------------------------------------------------------------------

/**
 * The case form, as `pages/domain/formula-language.domain.md` lines 32, 34 and
 * 38 spell it.
 *
 * `case(` opens and `)` closes, with the rows separated by commas (line 32). A
 * row is its test, then `->`, then its value (line 34). The last row is an
 * `otherwise` row, written with the word `otherwise` where its test would be
 * (line 38), and line 36 requires it.
 *
 *     case({ram} == "64gb" -> 6400, {ram} == "32gb" -> 3200, otherwise -> 0)
 *
 * Whitespace before `->` is alignment rather than syntax, so no case here is
 * written to depend on it: one space sits on each side of every `->`, and one
 * space follows each comma.
 *
 * Change this function and every case-form case is re-spelled.
 */
export function caseForm(rows: Array<{ test: string; value: string }>, otherwise: string): string {
  const written = [...rows, { test: "otherwise", value: otherwise }]
    .map((row) => `${row.test} -> ${row.value}`)
    .join(", ")
  return `case(${written})`
}

/** A case form written without its `otherwise` row, for the refusal cases. */
export function caseFormWithoutOtherwise(rows: Array<{ test: string; value: string }>): string {
  const written = rows.map((row) => `${row.test} -> ${row.value}`).join(", ")
  return `case(${written})`
}

/**
 * A call is its name, then its arguments between parentheses, separated by
 * commas, as `pages/domain/formula-language.domain.md:42` spells it.
 */
export function call(name: string, ...args: string[]): string {
  return `${name}(${args.join(", ")})`
}

// ---------------------------------------------------------------------------
// Short constructors, so a case reads as the claim it tests
// ---------------------------------------------------------------------------

const TEXT: FormulaType = { kind: "text" }
const NUMBER: FormulaType = { kind: "number" }
const BOOLEAN: FormulaType = { kind: "boolean" }
const INSTANT: FormulaType = { kind: "instant" }
const listOf = (of: FormulaType): FormulaType => ({ kind: "list", of })

const text = (value: string): FormulaValue => ({ kind: "text", text: value })
const num = (value: number): FormulaValue => ({ kind: "number", number: value })
const bool = (value: boolean): FormulaValue => ({ kind: "boolean", boolean: value })
const instant = (value: string): FormulaValue => ({ kind: "instant", instant: value })
const listOfValues = (...values: FormulaValue[]): FormulaValue => ({
  kind: "list",
  list: values,
})

const answers = (value: FormulaValue): Outcome => ({ outcome: "value", value })
const answersText = (value: string): Outcome => answers(text(value))
const answersNumber = (value: number): Outcome => answers(num(value))
const answersBoolean = (value: boolean): Outcome => answers(bool(value))
const ABSENT: Outcome = { outcome: "absent" }
const refused = (at: RefusalMoment, reason: RefusalReason, mustName?: string[]): Outcome => ({
  outcome: "refused",
  at,
  reason,
  ...(mustName ? { mustName } : {}),
})

// Shapes reused across many cases.
const NOTHING: Shape = {}
const COUNT: Shape = { count: { type: NUMBER } }
const NAME: Shape = { name: { type: TEXT } }
const FLAG: Shape = { flag: { type: BOOLEAN } }
const MIXED: Shape = {
  count: { type: NUMBER },
  other: { type: NUMBER },
  name: { type: TEXT },
  flag: { type: BOOLEAN },
  tags: { type: listOf(TEXT) },
  scores: { type: listOf(NUMBER) },
  start: { type: INSTANT },
  finish: { type: INSTANT },
}

// The pages this corpus is written from.
const FORMULA_LANGUAGE = "pages/domain/formula-language.domain.md"
const FORMULA_ABSENT_VALUE = "pages/domain/formula-absent-value.domain.md"
const FORMULA_VALUES = "pages/list/formula-values.list.md"
const FORMULA_FUNCTIONS = "pages/list/formula-functions.list.md"
const FORMULA_OPERATORS = "pages/list/formula-operators.list.md"
const LANGUAGE_FAILURE = "pages/domain/language-failure.domain.md"
const LANGUAGE_TYPE_SYSTEM = "pages/domain/language-type-system.domain.md"
const LANGUAGE_POWER = "pages/domain/language-power.domain.md"

const onLine = (page: string, line: number): Citation => ({ at: "line", page, line })
const namingNo = (page: string, section: string, ...names: string[]): Citation => ({
  at: "absence",
  page,
  section,
  names,
})

// Where each claim is written, once.
const L = {
  reference: onLine(FORMULA_LANGUAGE, 26),
  referenceInText: onLine(FORMULA_LANGUAGE, 28),
  chooseWithCase: onLine(FORMULA_LANGUAGE, 30),
  caseSpelling: onLine(FORMULA_LANGUAGE, 32),
  caseRowSpelling: onLine(FORMULA_LANGUAGE, 34),
  everyCaseOtherwise: onLine(FORMULA_LANGUAGE, 36),
  otherwiseSpelling: onLine(FORMULA_LANGUAGE, 38),
  onlyWinningRow: onLine(FORMULA_LANGUAGE, 40),
  callSpelling: onLine(FORMULA_LANGUAGE, 42),
  computedLikeStored: onLine(FORMULA_LANGUAGE, 44),
  noNames: onLine(FORMULA_LANGUAGE, 46),
  cycle: onLine(FORMULA_LANGUAGE, 48),
  joinsText: onLine(FORMULA_LANGUAGE, 50),
  precedence: onLine(FORMULA_LANGUAGE, 52),
  parenthesesGroup: onLine(FORMULA_LANGUAGE, 54),
  shortCircuit: onLine(FORMULA_LANGUAGE, 56),
  textLiteral: onLine(FORMULA_LANGUAGE, 58),
  valueWords: onLine(FORMULA_LANGUAGE, 60),
  undeclaredKey: onLine(FORMULA_LANGUAGE, 62),
  typesMeet: onLine(FORMULA_LANGUAGE, 64),
  neverFails: onLine(FORMULA_LANGUAGE, 66),

  absentOperator: onLine(FORMULA_ABSENT_VALUE, 15),
  absentEquality: onLine(FORMULA_ABSENT_VALUE, 17),
  rowMatchesOnTrue: onLine(FORMULA_ABSENT_VALUE, 19),
  fallback: onLine(FORMULA_ABSENT_VALUE, 21),
  divideByZero: onLine(FORMULA_ABSENT_VALUE, 23),
  textLiteralAbsent: onLine(FORMULA_ABSENT_VALUE, 25),

  valueText: onLine(FORMULA_VALUES, 15),
  valueNumber: onLine(FORMULA_VALUES, 16),
  valueBoolean: onLine(FORMULA_VALUES, 17),
  valueList: onLine(FORMULA_VALUES, 18),
  valueInstant: onLine(FORMULA_VALUES, 19),
  valueAbsent: onLine(FORMULA_VALUES, 20),

  fnNow: onLine(FORMULA_FUNCTIONS, 15),
  fnHoursBetween: onLine(FORMULA_FUNCTIONS, 16),
  fnContains: onLine(FORMULA_FUNCTIONS, 17),
  fnHasWord: onLine(FORMULA_FUNCTIONS, 18),

  opPlus: onLine(FORMULA_OPERATORS, 15),
  opMinus: onLine(FORMULA_OPERATORS, 16),
  opTimes: onLine(FORMULA_OPERATORS, 17),
  opDivide: onLine(FORMULA_OPERATORS, 18),
  opEqual: onLine(FORMULA_OPERATORS, 19),
  opNotEqual: onLine(FORMULA_OPERATORS, 20),
  opLess: onLine(FORMULA_OPERATORS, 21),
  opAtMost: onLine(FORMULA_OPERATORS, 22),
  opMore: onLine(FORMULA_OPERATORS, 23),
  opAtLeast: onLine(FORMULA_OPERATORS, 24),
  opAnd: onLine(FORMULA_OPERATORS, 25),
  opFallback: onLine(FORMULA_OPERATORS, 26),

  threeMoments: onLine(LANGUAGE_FAILURE, 15),
  caughtEarly: onLine(LANGUAGE_FAILURE, 23),
  refuseNotConvert: onLine(LANGUAGE_FAILURE, 33),
  absentStopsAnswer: onLine(LANGUAGE_FAILURE, 37),
  nameTheCause: onLine(LANGUAGE_FAILURE, 43),
  declaredNotGuessed: onLine(LANGUAGE_TYPE_SYSTEM, 17),
  leastPower: onLine(LANGUAGE_POWER, 17),

  // Claims about what a list leaves out. No line carries an absence, so these
  // name the section and the word that must not appear among its entries.
  noOrOperator: namingNo(FORMULA_OPERATORS, "List", "||"),
  noNotOperator: namingNo(FORMULA_OPERATORS, "List", "!"),
  noRemainderOperator: namingNo(FORMULA_OPERATORS, "List", "%"),
  noSingleEquals: namingNo(FORMULA_OPERATORS, "List", "="),
  noUpperFunction: namingNo(FORMULA_FUNCTIONS, "List", "upper"),
  noIncludesFunction: namingNo(FORMULA_FUNCTIONS, "List", "includes"),
} as const

const C = {
  reference: "A formula names a property by putting its key between braces.",
  referenceInText: "A reference inside a text literal is filled where it stands.",
  chooseWithCase: "A formula chooses between values with a case, and with nothing else.",
  caseSpelling: "A case is written `case(`, its rows separated by commas, then `)`.",
  caseRowSpelling: "A case row is written as its test, then `->`, then its value.",
  everyCaseOtherwise: "Every case ends with an `otherwise` row.",
  otherwiseSpelling:
    "An `otherwise` row is written with the word `otherwise` where its test would be.",
  onlyWinningRow: "A case works out only the value of the row whose test passed.",
  callSpelling:
    "A function call is written as its name, then its arguments between parentheses, separated by commas.",
  computedLikeStored: "A formula names a computed property exactly as it names a stored one.",
  noNames: "A formula gives no value a name of its own.",
  cycle: "A cycle among a page type's formulas is refused when the page type is checked.",
  joinsText: "A formula joins text by writing references into a text literal, and in no other way.",
  precedence:
    "A formula's operators bind in this order, loosest first: `??`, `&&`, comparison, addition, multiplication.",
  parenthesesGroup: "Parentheses group.",
  shortCircuit: "An operator that can answer from its left side alone does not work out its right.",
  textLiteral: "A text literal is written between double quotes, and holds no quote of its own.",
  valueWords: "Only `true`, `false` and `absent` are words standing for a value.",
  undeclaredKey:
    "A formula that names a key its page type does not declare is refused when the page type is checked.",
  typesMeet: "A formula whose types do not meet is refused when the page type is checked.",
  neverFails: "A formula that passes its check answers a value or absent, and never fails.",

  absentOperator: "An operator that reaches an absent value answers absent.",
  absentEquality: "`==` and `!=` answer a boolean, absent being equal only to absent.",
  rowMatchesOnTrue: "A case row matches only where its test answers true.",
  fallback: "`??` answers its left side, or its right where its left is absent.",
  divideByZero: "Dividing by zero answers absent.",
  textLiteralAbsent: "A text literal answers absent where any reference in it is absent.",

  valueText: "**text** — a run of characters.",
  valueNumber: "**number** — a count or a measure, whole or fractional.",
  valueBoolean: "**boolean** — true or false.",
  valueList: "**list** — several values of one kind, in order.",
  valueInstant: "**instant** — a moment in time, which only a function taking one may read.",
  valueAbsent:
    "**absent** — what a formula gets where the page holds nothing under the key it read.",

  fnNow: "**now** — the moment the formula is worked out, as an instant.",
  fnHoursBetween: "**hoursBetween** — the hours between two instants.",
  fnContains: "**contains** — whether a list holds a value.",
  fnHasWord: "**hasWord** — whether a text holds a word, bounded at both ends.",

  opPlus: "**`+`** — adds one number to another.",
  opMinus: "**`-`** — subtracts one number from another.",
  opTimes: "**`*`** — multiplies one number by another.",
  opDivide: "**`/`** — divides one number by another.",
  opEqual: "**`==`** — whether two values are the same.",
  opNotEqual: "**`!=`** — whether two values differ.",
  opLess: "**`<`** — whether the left is less than the right.",
  opAtMost: "**`<=`** — whether the left is at most the right.",
  opMore: "**`>`** — whether the left is more than the right.",
  opAtLeast: "**`>=`** — whether the left is at least the right.",
  opAnd: "**`&&`** — whether both sides are true.",
  opFallback: "**`??`** — the left, or the right where the left is absent.",

  threeMoments:
    "A program is found wrong at one of three moments: reading it, checking what it names, or running it on values.",
  caughtEarly: "Find a wrong program at the earliest moment it can be found.",
  refuseNotConvert: "Refuse a value the program cannot use, rather than making one it can.",
  absentStopsAnswer: "Let one absent value stop the whole answer.",
  nameTheCause:
    "Make a refusal say what was wrong and where, in the terms the program was written in.",
  declaredNotGuessed: "Take a value's type from what declared it, never from how it is written.",
  leastPower: "Give a language the least power that does the job.",

  noOrOperator: "The operators list names no `||`.",
  noNotOperator: "The operators list names no `!`.",
  noRemainderOperator: "The operators list names no `%`.",
  noSingleEquals: "The operators list names `==` and no `=`.",
  noUpperFunction: "The functions list names no `upper`.",
  noIncludesFunction: "The functions list names no `includes`.",
} as const

// ---------------------------------------------------------------------------
// References — putting a key between braces
// ---------------------------------------------------------------------------

const references: FormulaCase[] = [
  {
    name: "reference answers the number under its key",
    group: "references",
    from: L.reference,
    claim: C.reference,
    formula: "{count}",
    shape: COUNT,
    values: { count: num(7) },
    expected: answersNumber(7),
  },
  {
    name: "reference answers the text under its key",
    group: "references",
    from: L.reference,
    claim: C.reference,
    formula: "{name}",
    shape: NAME,
    values: { name: text("astra") },
    expected: answersText("astra"),
  },
  {
    name: "reference answers the boolean under its key",
    group: "references",
    from: L.reference,
    claim: C.reference,
    formula: "{flag}",
    shape: FLAG,
    values: { flag: bool(true) },
    expected: answersBoolean(true),
  },
  {
    name: "reference answers the list under its key",
    group: "references",
    from: L.valueList,
    claim: C.valueList,
    formula: "{tags}",
    shape: { tags: { type: listOf(TEXT) } },
    values: { tags: listOfValues(text("red"), text("green")) },
    expected: answers(listOfValues(text("red"), text("green"))),
  },
  {
    name: "reference to a declared key the page holds nothing under is absent",
    group: "references",
    from: L.valueAbsent,
    claim: C.valueAbsent,
    formula: "{count}",
    shape: COUNT,
    values: {},
    expected: ABSENT,
  },
  {
    name: "the same key read twice answers the same value",
    group: "references",
    from: L.reference,
    claim: C.reference,
    formula: "{count} + {count}",
    shape: COUNT,
    values: { count: num(4) },
    expected: answersNumber(8),
  },
  {
    name: "two different keys are read independently",
    group: "references",
    from: L.reference,
    claim: C.reference,
    formula: "{count} + {other}",
    shape: MIXED,
    values: { count: num(4), other: num(6) },
    expected: answersNumber(10),
  },
  {
    name: "a computed key is named exactly as a stored one",
    group: "references",
    from: L.computedLikeStored,
    claim: C.computedLikeStored,
    formula: "{doubled} + 1",
    shape: {
      count: { type: NUMBER },
      doubled: { type: NUMBER, formula: "{count} * 2" },
    },
    values: { count: num(5) },
    expected: answersNumber(11),
  },
  {
    name: "a computed key reading an absent stored key is absent",
    group: "references",
    from: L.computedLikeStored,
    claim: C.computedLikeStored,
    formula: "{doubled}",
    shape: {
      count: { type: NUMBER },
      doubled: { type: NUMBER, formula: "{count} * 2" },
    },
    values: {},
    expected: ABSENT,
  },
  {
    name: "a computed key reading another computed key",
    group: "references",
    from: L.computedLikeStored,
    claim: C.computedLikeStored,
    formula: "{quadrupled}",
    shape: {
      count: { type: NUMBER },
      doubled: { type: NUMBER, formula: "{count} * 2" },
      quadrupled: { type: NUMBER, formula: "{doubled} * 2" },
    },
    values: { count: num(3) },
    expected: answersNumber(12),
  },
  {
    name: "a boolean key holding false answers false, not absence",
    group: "references",
    from: L.valueBoolean,
    claim: C.valueBoolean,
    formula: "{flag}",
    shape: FLAG,
    values: { flag: bool(false) },
    expected: answersBoolean(false),
  },
  {
    name: "a boolean key holding nothing is absent, not false",
    group: "references",
    from: L.valueBoolean,
    claim: C.valueBoolean,
    formula: "{flag}",
    shape: FLAG,
    values: {},
    expected: ABSENT,
  },
  {
    name: "a number key holding zero answers zero, not absence",
    group: "references",
    from: L.valueAbsent,
    claim: C.valueAbsent,
    formula: "{count}",
    shape: COUNT,
    values: { count: num(0) },
    expected: answersNumber(0),
  },
  {
    name: "a text key holding empty text answers empty text, not absence",
    group: "references",
    from: L.valueAbsent,
    claim: C.valueAbsent,
    formula: "{name}",
    shape: NAME,
    values: { name: text("") },
    expected: answersText(""),
  },
  {
    name: "a list key holding an empty list answers an empty list, not absence",
    group: "references",
    from: L.valueAbsent,
    claim: C.valueAbsent,
    formula: "{tags}",
    shape: MIXED,
    values: { tags: listOfValues() },
    expected: answers(listOfValues()),
  },
  {
    name: "a stored value under a key the shape declares as text stays text",
    group: "references",
    from: L.declaredNotGuessed,
    claim: C.declaredNotGuessed,
    formula: '{name} == "12"',
    shape: NAME,
    values: { name: text("12") },
    expected: answersBoolean(true),
  },
]

// ---------------------------------------------------------------------------
// Text literals, and references inside them
// ---------------------------------------------------------------------------

const textLiterals: FormulaCase[] = [
  {
    name: "a text literal answers its own characters",
    group: "text-literals",
    from: L.textLiteral,
    claim: C.textLiteral,
    formula: '"hello"',
    shape: NOTHING,
    values: {},
    expected: answersText("hello"),
  },
  {
    name: "an empty text literal answers empty text",
    group: "text-literals",
    from: L.textLiteral,
    claim: C.textLiteral,
    formula: '""',
    shape: NOTHING,
    values: {},
    expected: answersText(""),
  },
  {
    name: "a text literal holding spaces keeps them",
    group: "text-literals",
    from: L.valueText,
    claim: C.valueText,
    formula: '"  two  spaces  "',
    shape: NOTHING,
    values: {},
    expected: answersText("  two  spaces  "),
  },
  {
    name: "a text literal holding braces-looking words that are not a reference",
    group: "text-literals",
    from: L.valueText,
    claim: C.valueText,
    formula: '"a plain sentence"',
    shape: NOTHING,
    values: {},
    expected: answersText("a plain sentence"),
  },
  {
    name: "a reference inside a text literal is filled where it stands",
    group: "text-literals",
    from: L.referenceInText,
    claim: C.referenceInText,
    formula: '"hello {name}"',
    shape: NAME,
    values: { name: text("astra") },
    expected: answersText("hello astra"),
  },
  {
    name: "a reference at the very start of a text literal",
    group: "text-literals",
    from: L.referenceInText,
    claim: C.referenceInText,
    formula: '"{name} speaks"',
    shape: NAME,
    values: { name: text("astra") },
    expected: answersText("astra speaks"),
  },
  {
    name: "a reference at the very end of a text literal",
    group: "text-literals",
    from: L.referenceInText,
    claim: C.referenceInText,
    formula: '"named {name}"',
    shape: NAME,
    values: { name: text("astra") },
    expected: answersText("named astra"),
  },
  {
    name: "a text literal that is nothing but a reference",
    group: "text-literals",
    from: L.referenceInText,
    claim: C.referenceInText,
    formula: '"{name}"',
    shape: NAME,
    values: { name: text("astra") },
    expected: answersText("astra"),
  },
  {
    name: "two references in one text literal, each filled where it stands",
    group: "text-literals",
    from: L.referenceInText,
    claim: C.referenceInText,
    formula: '"{first}-{second}"',
    shape: { first: { type: TEXT }, second: { type: TEXT } },
    values: { first: text("green"), second: text("day") },
    expected: answersText("green-day"),
  },
  {
    name: "the same reference twice in one text literal",
    group: "text-literals",
    from: L.referenceInText,
    claim: C.referenceInText,
    formula: '"{name} and {name}"',
    shape: NAME,
    values: { name: text("astra") },
    expected: answersText("astra and astra"),
  },
  {
    name: "braces inside a filled value are characters, not a second reference",
    group: "text-literals",
    from: L.reference,
    claim: C.reference,
    formula: "{name}",
    shape: NAME,
    values: { name: text("{name}") },
    expected: answersText("{name}"),
    // Nothing in the specification says a filled value is read again.
  },
  {
    name: "braces in a value filled into a text literal are not read again",
    group: "text-literals",
    from: L.referenceInText,
    claim: C.referenceInText,
    formula: '"say {name}"',
    shape: MIXED,
    values: { name: text("{count}"), count: num(9) },
    expected: answersText("say {count}"),
  },
  {
    name: "text is joined by writing two references into one text literal",
    group: "text-literals",
    from: L.joinsText,
    claim: C.joinsText,
    formula: '"{first}{second}"',
    shape: { first: { type: TEXT }, second: { type: TEXT } },
    values: { first: text("green"), second: text("day") },
    expected: answersText("greenday"),
  },
  {
    name: "joining a reference to a text literal with plus is refused",
    group: "text-literals",
    from: L.joinsText,
    claim: C.joinsText,
    formula: '{name} + "!"',
    shape: NAME,
    values: { name: text("astra") },
    expected: refused("check", "types-do-not-meet", ["name", "text"]),
  },
  {
    name: "joining text with an ampersand is refused",
    group: "text-literals",
    from: L.joinsText,
    claim: C.joinsText,
    formula: '{name} & "!"',
    shape: NAME,
    values: { name: text("astra") },
    expected: refused("read", "unknown-operator", ["&"]),
  },
  {
    name: "joining a text and a number with plus is refused",
    group: "text-literals",
    from: L.joinsText,
    claim: C.joinsText,
    formula: "{name} + {count}",
    shape: MIXED,
    values: { name: text("astra"), count: num(1) },
    expected: refused("check", "types-do-not-meet", ["name", "text"]),
  },
  {
    name: "joining text by any means but a text literal is refused",
    group: "text-literals",
    from: L.joinsText,
    claim: C.joinsText,
    formula: "{first} + {second}",
    shape: { first: { type: TEXT }, second: { type: TEXT } },
    values: { first: text("green"), second: text("day") },
    expected: refused("check", "types-do-not-meet", ["+", "text"]),
    // `+` adds one number to another; two texts do not meet it.
  },
  {
    name: "a text literal that is nothing but an absent reference answers absent",
    group: "text-literals",
    from: L.textLiteralAbsent,
    claim: C.textLiteralAbsent,
    formula: '"{name}"',
    shape: NAME,
    values: {},
    expected: ABSENT,
  },
  {
    name: "a text literal with words around an absent reference answers absent",
    group: "text-literals",
    from: L.textLiteralAbsent,
    claim: C.textLiteralAbsent,
    formula: '"hello {name}"',
    shape: NAME,
    values: {},
    expected: ABSENT,
    // Not "hello ". The words around the hole do not survive it.
  },
  {
    name: "an absent reference does not render as the empty string",
    group: "text-literals",
    from: L.textLiteralAbsent,
    claim: C.textLiteralAbsent,
    formula: '"{name}" == ""',
    shape: NAME,
    values: {},
    expected: answersBoolean(false),
    // The literal answers absent, and absent is equal only to absent. An
    // implementation that renders a hole as nothing answers true here. The
    // empty string is a made value: it answers in place of the one meant and
    // nothing after it can tell which it got.
  },
  {
    name: "an absent reference does not render as the word absent",
    group: "text-literals",
    from: L.textLiteralAbsent,
    claim: C.textLiteralAbsent,
    formula: '"{name}" == "absent"',
    shape: NAME,
    values: {},
    expected: answersBoolean(false),
    // An implementation that spells the absence into the text answers true.
  },
  {
    name: "a text literal holding an absent reference is equal to absent",
    group: "text-literals",
    from: L.textLiteralAbsent,
    claim: C.textLiteralAbsent,
    formula: '"{name}" == absent',
    shape: NAME,
    values: {},
    expected: answersBoolean(true),
  },
  {
    name: "a text literal answers absent where one of two references is absent",
    group: "text-literals",
    from: L.textLiteralAbsent,
    claim: C.textLiteralAbsent,
    formula: '"{first}-{second}"',
    shape: { first: { type: TEXT }, second: { type: TEXT } },
    values: { first: text("green") },
    expected: ABSENT,
    // Not "green-". A partly filled answer is the defect this line closes.
  },
  {
    name: "a text literal answers absent where the first of two references is absent",
    group: "text-literals",
    from: L.textLiteralAbsent,
    claim: C.textLiteralAbsent,
    formula: '"{first}-{second}"',
    shape: { first: { type: TEXT }, second: { type: TEXT } },
    values: { second: text("day") },
    expected: ABSENT,
  },
  {
    name: "a text literal answers absent where the middle of three references is absent",
    group: "text-literals",
    from: L.textLiteralAbsent,
    claim: C.textLiteralAbsent,
    formula: '"{first} {second} {third}"',
    shape: {
      first: { type: TEXT },
      second: { type: TEXT },
      third: { type: TEXT },
    },
    values: { first: text("a"), third: text("c") },
    expected: ABSENT,
  },
  {
    name: "the name shape this rule was written for answers absent, not a name that looks right",
    group: "text-literals",
    from: L.textLiteralAbsent,
    claim: C.textLiteralAbsent,
    formula: '"{source-slug}-{date}"',
    shape: { "source-slug": { type: TEXT }, date: { type: TEXT } },
    values: { date: text("2026-08-27") },
    expected: ABSENT,
    // A page named from more than one part, missing one. Rendering the gap as
    // nothing answers "-2026-08-27", which reads like a name and is not one.
  },
  {
    name: "the same name shape answers its name where both parts are there",
    group: "text-literals",
    from: L.referenceInText,
    claim: C.referenceInText,
    formula: '"{source-slug}-{date}"',
    shape: { "source-slug": { type: TEXT }, date: { type: TEXT } },
    values: { "source-slug": text("royal-road"), date: text("2026-08-27") },
    expected: answersText("royal-road-2026-08-27"),
  },
  {
    name: "a key holding a hyphen is one key inside braces, never a subtraction",
    group: "references",
    from: L.reference,
    claim: C.reference,
    formula: "{source-slug}",
    shape: { "source-slug": { type: TEXT } },
    values: { "source-slug": text("royal-road") },
    expected: answersText("royal-road"),
    // The braces bound the key, so nothing inside them is read as an operator.
  },
  {
    name: "a fallback around a text literal is the way out",
    group: "text-literals",
    from: L.fallback,
    claim: C.fallback,
    formula: '"{source-slug}-{date}" ?? "untitled"',
    shape: { "source-slug": { type: TEXT }, date: { type: TEXT } },
    values: { date: text("2026-08-27") },
    expected: answersText("untitled"),
    // The literal answers absent, so the page type gets a whole name it chose
    // rather than a partly filled one it did not.
  },
  {
    name: "a fallback around a text literal keeps the literal where nothing is absent",
    group: "text-literals",
    from: L.fallback,
    claim: C.fallback,
    formula: '"{source-slug}-{date}" ?? "untitled"',
    shape: { "source-slug": { type: TEXT }, date: { type: TEXT } },
    values: { "source-slug": text("royal-road"), date: text("2026-08-27") },
    expected: answersText("royal-road-2026-08-27"),
  },
  {
    name: "a fallback on the key itself is the other way out",
    group: "text-literals",
    from: L.fallback,
    claim: C.fallback,
    formula: '"{safe-source}-{date}"',
    shape: {
      "source-slug": { type: TEXT },
      date: { type: TEXT },
      "safe-source": { type: TEXT, formula: '{source-slug} ?? "unknown"' },
    },
    values: { date: text("2026-08-27") },
    expected: answersText("unknown-2026-08-27"),
    // The hole is filled where it is declared rather than where it is read, so
    // every literal naming `safe-source` is whole.
  },
  {
    name: "a computed key that is a text literal carries the absence outward",
    group: "text-literals",
    from: L.textLiteralAbsent,
    claim: C.textLiteralAbsent,
    formula: "{label}",
    shape: {
      name: { type: TEXT },
      label: { type: TEXT, formula: '"a {name} b"' },
    },
    values: {},
    expected: ABSENT,
  },
  {
    name: "a case row answering a text literal with an absent reference answers absent",
    group: "text-literals",
    from: L.textLiteralAbsent,
    claim: C.textLiteralAbsent,
    formula: caseForm([{ test: "true", value: '"hello {name}"' }], '"none"'),
    shape: NAME,
    values: {},
    expected: ABSENT,
    // The winning row's value is worked out, and what it works out to is
    // absent.
  },
  {
    name: "a present but empty reference is not an absent one",
    group: "text-literals",
    from: L.textLiteralAbsent,
    claim: C.textLiteralAbsent,
    formula: '"a{name}b"',
    shape: NAME,
    values: { name: text("") },
    expected: answersText("ab"),
    // The page holds something under the key, so nothing is absent and the
    // literal answers. Empty is a value; absent is the lack of one.
  },
  {
    name: "an expression inside braces is not a key",
    group: "refused-at-read",
    from: L.reference,
    claim: C.reference,
    formula: "{name ?? id}",
    shape: { name: { type: TEXT }, id: { type: TEXT } },
    values: { id: text("019f1412") },
    expected: refused("read", "unreadable"),
    // A formula names a property by putting its key between braces, and a key
    // is all that goes there. The fallback is written outside the braces, or
    // on the key's own definition.
  },
  {
    name: "a quote inside a text literal is refused when the formula is read",
    group: "refused-at-read",
    from: L.textLiteral,
    claim: C.textLiteral,
    formula: '"she said "hi""',
    shape: NOTHING,
    values: {},
    expected: refused("read", "quote-inside-text-literal"),
  },
  {
    name: "a backslash-escaped quote is still a quote inside a text literal",
    group: "refused-at-read",
    from: L.textLiteral,
    claim: C.textLiteral,
    formula: '"she said \\"hi\\""',
    shape: NOTHING,
    values: {},
    expected: refused("read", "quote-inside-text-literal"),
    // The specification allows a text literal no quote of its own and names no
    // escape, so nothing makes this one legal.
  },
  {
    name: "an unclosed text literal is refused when the formula is read",
    group: "refused-at-read",
    from: L.textLiteral,
    claim: C.textLiteral,
    formula: '"hello',
    shape: NOTHING,
    values: {},
    expected: refused("read", "unreadable"),
  },
  {
    name: "a single-quoted literal is not a text literal",
    group: "refused-at-read",
    from: L.textLiteral,
    claim: C.textLiteral,
    formula: "'hello'",
    shape: NOTHING,
    values: {},
    expected: refused("read", "unreadable"),
  },
]

// ---------------------------------------------------------------------------
// Value words, and words that are not
// ---------------------------------------------------------------------------

const valueWords: FormulaCase[] = [
  {
    name: "the word true stands for a boolean",
    group: "value-words",
    from: L.valueWords,
    claim: C.valueWords,
    formula: "true",
    shape: NOTHING,
    values: {},
    expected: answersBoolean(true),
  },
  {
    name: "the word false stands for a boolean",
    group: "value-words",
    from: L.valueWords,
    claim: C.valueWords,
    formula: "false",
    shape: NOTHING,
    values: {},
    expected: answersBoolean(false),
  },
  {
    name: "the word absent stands for absence",
    group: "value-words",
    from: L.valueWords,
    claim: C.valueWords,
    formula: "absent",
    shape: NOTHING,
    values: {},
    expected: ABSENT,
  },
  {
    name: "a whole number literal",
    group: "value-words",
    from: L.valueNumber,
    claim: C.valueNumber,
    formula: "42",
    shape: NOTHING,
    values: {},
    expected: answersNumber(42),
  },
  {
    name: "a fractional number literal",
    group: "value-words",
    from: L.valueNumber,
    claim: C.valueNumber,
    formula: "1.5",
    shape: NOTHING,
    values: {},
    expected: answersNumber(1.5),
  },
  {
    name: "zero is a number literal",
    group: "value-words",
    from: L.valueNumber,
    claim: C.valueNumber,
    formula: "0",
    shape: NOTHING,
    values: {},
    expected: answersNumber(0),
  },
  {
    name: "null is not a word standing for a value",
    group: "refused-at-read",
    from: L.valueWords,
    claim: C.valueWords,
    formula: "null",
    shape: NOTHING,
    values: {},
    expected: refused("read", "unknown-word", ["null"]),
  },
  {
    name: "nothing is not a word standing for a value",
    group: "refused-at-read",
    from: L.valueWords,
    claim: C.valueWords,
    formula: "nothing",
    shape: NOTHING,
    values: {},
    expected: refused("read", "unknown-word", ["nothing"]),
  },
  {
    name: "undefined is not a word standing for a value",
    group: "refused-at-read",
    from: L.valueWords,
    claim: C.valueWords,
    formula: "undefined",
    shape: NOTHING,
    values: {},
    expected: refused("read", "unknown-word", ["undefined"]),
  },
  {
    name: "TRUE is not the word true",
    group: "refused-at-read",
    from: L.valueWords,
    claim: C.valueWords,
    formula: "TRUE",
    shape: NOTHING,
    values: {},
    expected: refused("read", "unknown-word", ["TRUE"]),
  },
  {
    name: "a bare key without braces is not a reference",
    group: "refused-at-read",
    from: L.reference,
    claim: C.reference,
    formula: "count",
    shape: COUNT,
    values: { count: num(1) },
    expected: refused("read", "unknown-word", ["count"]),
  },
  {
    name: "otherwise outside a case is not a word standing for a value",
    group: "refused-at-read",
    from: L.valueWords,
    claim: C.valueWords,
    formula: "otherwise",
    shape: NOTHING,
    values: {},
    expected: refused("read", "unknown-word", ["otherwise"]),
  },
  {
    name: "a list literal has no spelling",
    group: "refused-at-read",
    from: L.leastPower,
    claim: C.leastPower,
    formula: '["a", "b"]',
    shape: NOTHING,
    values: {},
    expected: refused("read", "unreadable"),
    provisional: "no-list-literal",
    // Nothing in the specification spells a list literal; a list reaches a
    // formula only from a key.
  },
]

// ---------------------------------------------------------------------------
// Arithmetic
// ---------------------------------------------------------------------------

const arithmetic: FormulaCase[] = [
  {
    name: "plus adds one number to another",
    group: "arithmetic",
    from: L.opPlus,
    claim: C.opPlus,
    formula: "2 + 3",
    shape: NOTHING,
    values: {},
    expected: answersNumber(5),
  },
  {
    name: "plus over a reference and a literal",
    group: "arithmetic",
    from: L.opPlus,
    claim: C.opPlus,
    formula: "{count} + 1",
    shape: COUNT,
    values: { count: num(41) },
    expected: answersNumber(42),
  },
  {
    name: "plus over fractional numbers",
    group: "arithmetic",
    from: L.opPlus,
    claim: C.opPlus,
    formula: "1.5 + 1.5",
    shape: NOTHING,
    values: {},
    expected: answersNumber(3),
  },
  {
    name: "minus subtracts one number from another",
    group: "arithmetic",
    from: L.opMinus,
    claim: C.opMinus,
    formula: "5 - 3",
    shape: NOTHING,
    values: {},
    expected: answersNumber(2),
  },
  {
    name: "minus can answer a number below zero",
    group: "arithmetic",
    from: L.opMinus,
    claim: C.opMinus,
    formula: "3 - 5",
    shape: NOTHING,
    values: {},
    expected: answersNumber(-2),
  },
  {
    name: "times multiplies one number by another",
    group: "arithmetic",
    from: L.opTimes,
    claim: C.opTimes,
    formula: "3 * 4",
    shape: NOTHING,
    values: {},
    expected: answersNumber(12),
  },
  {
    name: "times by zero",
    group: "arithmetic",
    from: L.opTimes,
    claim: C.opTimes,
    formula: "{count} * 0",
    shape: COUNT,
    values: { count: num(9) },
    expected: answersNumber(0),
  },
  {
    name: "divide divides one number by another",
    group: "arithmetic",
    from: L.opDivide,
    claim: C.opDivide,
    formula: "6 / 3",
    shape: NOTHING,
    values: {},
    expected: answersNumber(2),
  },
  {
    name: "divide answers a fractional number",
    group: "arithmetic",
    from: L.opDivide,
    claim: C.opDivide,
    formula: "7 / 2",
    shape: NOTHING,
    values: {},
    expected: answersNumber(3.5),
    // `number` is "a count or a measure, whole or fractional", so this is not
    // rounded and not refused.
  },
  {
    name: "dividing by a zero literal answers absent",
    group: "arithmetic",
    from: L.divideByZero,
    claim: C.divideByZero,
    formula: "{count} / 0",
    shape: COUNT,
    values: { count: num(9) },
    expected: ABSENT,
  },
  {
    name: "dividing by a key holding zero answers absent",
    group: "arithmetic",
    from: L.divideByZero,
    claim: C.divideByZero,
    formula: "{count} / {other}",
    shape: MIXED,
    values: { count: num(9), other: num(0) },
    expected: ABSENT,
  },
  {
    name: "zero divided by zero answers absent",
    group: "arithmetic",
    from: L.divideByZero,
    claim: C.divideByZero,
    formula: "0 / 0",
    shape: NOTHING,
    values: {},
    expected: ABSENT,
  },
  {
    name: "dividing by zero answers absent rather than failing",
    group: "never-fails",
    from: L.neverFails,
    claim: C.neverFails,
    formula: "1 / 0",
    shape: NOTHING,
    values: {},
    expected: ABSENT,
  },
  {
    name: "an absent from a division by zero carries into the operator above it",
    group: "arithmetic",
    from: L.absentOperator,
    claim: C.absentOperator,
    formula: "1 + 1 / 0",
    shape: NOTHING,
    values: {},
    expected: ABSENT,
  },
]

// ---------------------------------------------------------------------------
// Comparison
// ---------------------------------------------------------------------------

const comparison: FormulaCase[] = [
  {
    name: "equal answers true where two numbers are the same",
    group: "comparison",
    from: L.opEqual,
    claim: C.opEqual,
    formula: "2 == 2",
    shape: NOTHING,
    values: {},
    expected: answersBoolean(true),
  },
  {
    name: "equal answers false where two numbers differ",
    group: "comparison",
    from: L.opEqual,
    claim: C.opEqual,
    formula: "2 == 3",
    shape: NOTHING,
    values: {},
    expected: answersBoolean(false),
  },
  {
    name: "equal over two texts",
    group: "comparison",
    from: L.opEqual,
    claim: C.opEqual,
    formula: '"a" == "a"',
    shape: NOTHING,
    values: {},
    expected: answersBoolean(true),
  },
  {
    name: "equal over two texts that differ",
    group: "comparison",
    from: L.opEqual,
    claim: C.opEqual,
    formula: '"a" == "b"',
    shape: NOTHING,
    values: {},
    expected: answersBoolean(false),
  },
  {
    name: "equal over two booleans",
    group: "comparison",
    from: L.opEqual,
    claim: C.opEqual,
    formula: "true == true",
    shape: NOTHING,
    values: {},
    expected: answersBoolean(true),
  },
  {
    name: "equal over two booleans that differ",
    group: "comparison",
    from: L.opEqual,
    claim: C.opEqual,
    formula: "true == false",
    shape: NOTHING,
    values: {},
    expected: answersBoolean(false),
  },
  {
    name: "not-equal answers true where two values differ",
    group: "comparison",
    from: L.opNotEqual,
    claim: C.opNotEqual,
    formula: "2 != 3",
    shape: NOTHING,
    values: {},
    expected: answersBoolean(true),
  },
  {
    name: "not-equal answers false where two values are the same",
    group: "comparison",
    from: L.opNotEqual,
    claim: C.opNotEqual,
    formula: '"a" != "a"',
    shape: NOTHING,
    values: {},
    expected: answersBoolean(false),
  },
  {
    name: "less than answers true where the left is less",
    group: "comparison",
    from: L.opLess,
    claim: C.opLess,
    formula: "1 < 2",
    shape: NOTHING,
    values: {},
    expected: answersBoolean(true),
  },
  {
    name: "less than answers false where the two are equal",
    group: "comparison",
    from: L.opLess,
    claim: C.opLess,
    formula: "2 < 2",
    shape: NOTHING,
    values: {},
    expected: answersBoolean(false),
  },
  {
    name: "at most answers true where the two are equal",
    group: "comparison",
    from: L.opAtMost,
    claim: C.opAtMost,
    formula: "2 <= 2",
    shape: NOTHING,
    values: {},
    expected: answersBoolean(true),
  },
  {
    name: "at most answers false where the left is more",
    group: "comparison",
    from: L.opAtMost,
    claim: C.opAtMost,
    formula: "3 <= 2",
    shape: NOTHING,
    values: {},
    expected: answersBoolean(false),
  },
  {
    name: "more than answers true where the left is more",
    group: "comparison",
    from: L.opMore,
    claim: C.opMore,
    formula: "{count} > 2",
    shape: COUNT,
    values: { count: num(3) },
    expected: answersBoolean(true),
  },
  {
    name: "more than answers false where the two are equal",
    group: "comparison",
    from: L.opMore,
    claim: C.opMore,
    formula: "2 > 2",
    shape: NOTHING,
    values: {},
    expected: answersBoolean(false),
  },
  {
    name: "at least answers true where the two are equal",
    group: "comparison",
    from: L.opAtLeast,
    claim: C.opAtLeast,
    formula: "2 >= 2",
    shape: NOTHING,
    values: {},
    expected: answersBoolean(true),
  },
  {
    name: "at least answers false where the left is less",
    group: "comparison",
    from: L.opAtLeast,
    claim: C.opAtLeast,
    formula: "1 >= 2",
    shape: NOTHING,
    values: {},
    expected: answersBoolean(false),
  },
  {
    name: "comparison over fractional numbers",
    group: "comparison",
    from: L.opLess,
    claim: C.opLess,
    formula: "1.4 < 1.5",
    shape: NOTHING,
    values: {},
    expected: answersBoolean(true),
  },
]

// ---------------------------------------------------------------------------
// Conjunction
// ---------------------------------------------------------------------------

const conjunction: FormulaCase[] = [
  {
    name: "and answers true where both sides are true",
    group: "conjunction",
    from: L.opAnd,
    claim: C.opAnd,
    formula: "true && true",
    shape: NOTHING,
    values: {},
    expected: answersBoolean(true),
  },
  {
    name: "and answers false where the left is false",
    group: "conjunction",
    from: L.opAnd,
    claim: C.opAnd,
    formula: "false && true",
    shape: NOTHING,
    values: {},
    expected: answersBoolean(false),
  },
  {
    name: "and answers false where the right is false",
    group: "conjunction",
    from: L.opAnd,
    claim: C.opAnd,
    formula: "true && false",
    shape: NOTHING,
    values: {},
    expected: answersBoolean(false),
  },
  {
    name: "and answers false where both sides are false",
    group: "conjunction",
    from: L.opAnd,
    claim: C.opAnd,
    formula: "false && false",
    shape: NOTHING,
    values: {},
    expected: answersBoolean(false),
  },
  {
    name: "and over two comparisons",
    group: "conjunction",
    from: L.opAnd,
    claim: C.opAnd,
    formula: "{count} > 0 && {count} < 10",
    shape: COUNT,
    values: { count: num(5) },
    expected: answersBoolean(true),
  },
  {
    name: "and over three sides",
    group: "conjunction",
    from: L.opAnd,
    claim: C.opAnd,
    formula: "true && true && false",
    shape: NOTHING,
    values: {},
    expected: answersBoolean(false),
  },
  {
    name: "a false left side answers false without working out a division by zero",
    group: "conjunction",
    from: L.shortCircuit,
    claim: C.shortCircuit,
    formula: "false && {count} / 0 > 0",
    shape: COUNT,
    values: { count: num(1) },
    expected: answersBoolean(false),
    // The right side would answer absent. An implementation that works both
    // sides out and then discards the right answers absent and fails here.
  },
  {
    name: "a false left side reached through a comparison does not work out its right",
    group: "conjunction",
    from: L.shortCircuit,
    claim: C.shortCircuit,
    formula: "{count} > 10 && {other} / 0 > 0",
    shape: MIXED,
    values: { count: num(1), other: num(1) },
    expected: answersBoolean(false),
    // The left side is false because it was worked out, not because it was
    // written `false`.
  },
  {
    name: "a false left side short circuits through a chain of ands",
    group: "conjunction",
    from: L.shortCircuit,
    claim: C.shortCircuit,
    formula: "false && {flag} && {other} / 0 > 0",
    shape: MIXED,
    values: { other: num(1) },
    expected: answersBoolean(false),
    // Neither the absent `{flag}` nor the division by zero is reached. The
    // answer is false whichever way `&&` associates, so this case does not
    // rest on an associativity the pages do not state.
  },
  {
    name: "a true left side does work out its right",
    group: "conjunction",
    from: L.shortCircuit,
    claim: C.shortCircuit,
    formula: "true && {count} / 0 > 0",
    shape: COUNT,
    values: { count: num(1) },
    expected: ABSENT,
    // `&&` cannot answer from a true left alone, so it reaches the right,
    // reaches the absent the division by zero makes, and answers absent.
  },
  {
    name: "or is not an operator this language has",
    group: "refused-at-read",
    from: L.noOrOperator,
    claim: C.noOrOperator,
    formula: "false || true",
    shape: NOTHING,
    values: {},
    expected: refused("read", "unknown-operator", ["||"]),
    // `||` belonged to the language this one replaces.
  },
  {
    name: "not is not an operator this language has",
    group: "refused-at-read",
    from: L.noNotOperator,
    claim: C.noNotOperator,
    formula: "!true",
    shape: NOTHING,
    values: {},
    expected: refused("read", "unknown-operator", ["!"]),
  },
  {
    name: "remainder is not an operator this language has",
    group: "refused-at-read",
    from: L.noRemainderOperator,
    claim: C.noRemainderOperator,
    formula: "7 % 2",
    shape: NOTHING,
    values: {},
    expected: refused("read", "unknown-operator", ["%"]),
  },
  {
    name: "single equals is not an operator this language has",
    group: "refused-at-read",
    from: L.noSingleEquals,
    claim: C.noSingleEquals,
    formula: "1 = 1",
    shape: NOTHING,
    values: {},
    expected: refused("read", "unknown-operator", ["="]),
  },
]

// ---------------------------------------------------------------------------
// Fallback
// ---------------------------------------------------------------------------

const fallback: FormulaCase[] = [
  {
    name: "fallback answers its left side where the left is there",
    group: "fallback",
    from: L.fallback,
    claim: C.fallback,
    formula: "{count} ?? 0",
    shape: COUNT,
    values: { count: num(7) },
    expected: answersNumber(7),
  },
  {
    name: "fallback answers its right side where the left is absent",
    group: "fallback",
    from: L.fallback,
    claim: C.fallback,
    formula: "{count} ?? 0",
    shape: COUNT,
    values: {},
    expected: answersNumber(0),
  },
  {
    name: "fallback keeps a left side that is zero",
    group: "fallback",
    from: L.fallback,
    claim: C.fallback,
    formula: "{count} ?? 99",
    shape: COUNT,
    values: { count: num(0) },
    expected: answersNumber(0),
    // Absence, not falsity, is what makes the right side answer.
  },
  {
    name: "fallback keeps a left side that is empty text",
    group: "fallback",
    from: L.fallback,
    claim: C.fallback,
    formula: '{name} ?? "fallback"',
    shape: NAME,
    values: { name: text("") },
    expected: answersText(""),
  },
  {
    name: "fallback keeps a left side that is false",
    group: "fallback",
    from: L.fallback,
    claim: C.fallback,
    formula: "{flag} ?? true",
    shape: FLAG,
    values: { flag: bool(false) },
    expected: answersBoolean(false),
  },
  {
    name: "fallback over two references, the first absent",
    group: "fallback",
    from: L.opFallback,
    claim: C.opFallback,
    formula: "{count} ?? {other}",
    shape: MIXED,
    values: { other: num(3) },
    expected: answersNumber(3),
  },
  {
    name: "fallback chained, the first two absent",
    group: "fallback",
    from: L.opFallback,
    claim: C.opFallback,
    formula: "{count} ?? {other} ?? 5",
    shape: MIXED,
    values: {},
    expected: answersNumber(5),
  },
  {
    name: "fallback answers absent where both sides are absent",
    group: "fallback",
    from: L.opFallback,
    claim: C.opFallback,
    formula: "{count} ?? {other}",
    shape: MIXED,
    values: {},
    expected: ABSENT,
  },
  {
    name: "fallback against the word absent on the left",
    group: "fallback",
    from: L.fallback,
    claim: C.fallback,
    formula: "absent ?? 1",
    shape: NOTHING,
    values: {},
    expected: answersNumber(1),
  },
  {
    name: "a fallback reaching an absent left answers its right, not absent",
    group: "fallback",
    from: L.fallback,
    claim: C.fallback,
    formula: "{count} ?? 1",
    shape: COUNT,
    values: {},
    expected: answersNumber(1),
  },
  {
    name: "a fallback answers its left without working out a division by zero",
    group: "fallback",
    from: L.shortCircuit,
    claim: C.shortCircuit,
    formula: "{count} ?? {other} / 0",
    shape: MIXED,
    values: { count: num(7), other: num(1) },
    expected: answersNumber(7),
    // The unreached right side would answer absent. An implementation that
    // works both sides out and lets an absent win answers absent here.
  },
  {
    name: "a fallback answers its left without reaching an absent right",
    group: "fallback",
    from: L.shortCircuit,
    claim: C.shortCircuit,
    formula: "{count} ?? {other}",
    shape: MIXED,
    values: { count: num(7) },
    expected: answersNumber(7),
  },
  {
    name: "the default name formula answers the slug where the page holds one",
    group: "fallback",
    from: L.fallback,
    claim: C.fallback,
    formula: "{slug} ?? {id}",
    shape: { slug: { type: TEXT }, id: { type: TEXT } },
    values: { slug: text("astra"), id: text("019f1412") },
    expected: answersText("astra"),
  },
  {
    name: "the default name formula falls back to the id",
    group: "fallback",
    from: L.fallback,
    claim: C.fallback,
    formula: "{slug} ?? {id}",
    shape: { slug: { type: TEXT }, id: { type: TEXT } },
    values: { id: text("019f1412") },
    expected: answersText("019f1412"),
  },
]

// ---------------------------------------------------------------------------
// Precedence and grouping
// ---------------------------------------------------------------------------

const precedence: FormulaCase[] = [
  {
    name: "multiplication binds tighter than addition, on the right",
    group: "precedence-and-grouping",
    from: L.precedence,
    claim: C.precedence,
    formula: "2 + 3 * 4",
    shape: NOTHING,
    values: {},
    expected: answersNumber(14),
  },
  {
    name: "multiplication binds tighter than addition, on the left",
    group: "precedence-and-grouping",
    from: L.precedence,
    claim: C.precedence,
    formula: "2 * 3 + 4",
    shape: NOTHING,
    values: {},
    expected: answersNumber(10),
  },
  {
    name: "division binds tighter than subtraction",
    group: "precedence-and-grouping",
    from: L.precedence,
    claim: C.precedence,
    formula: "10 - 6 / 2",
    shape: NOTHING,
    values: {},
    expected: answersNumber(7),
  },
  {
    name: "parentheses lift addition above multiplication",
    group: "precedence-and-grouping",
    from: L.parenthesesGroup,
    claim: C.parenthesesGroup,
    formula: "(2 + 3) * 4",
    shape: NOTHING,
    values: {},
    expected: answersNumber(20),
  },
  {
    name: "parentheses nest",
    group: "precedence-and-grouping",
    from: L.parenthesesGroup,
    claim: C.parenthesesGroup,
    formula: "((1 + 2) * (3 + 4)) - 1",
    shape: NOTHING,
    values: {},
    expected: answersNumber(20),
  },
  {
    name: "parentheses around a whole formula change nothing",
    group: "precedence-and-grouping",
    from: L.parenthesesGroup,
    claim: C.parenthesesGroup,
    formula: "(2 + 3)",
    shape: NOTHING,
    values: {},
    expected: answersNumber(5),
  },
  {
    name: "an unclosed parenthesis is refused when the formula is read",
    group: "refused-at-read",
    from: L.parenthesesGroup,
    claim: C.parenthesesGroup,
    formula: "(2 + 3",
    shape: NOTHING,
    values: {},
    expected: refused("read", "unreadable"),
  },
  {
    name: "addition binds tighter than comparison",
    group: "precedence-and-grouping",
    from: L.precedence,
    claim: C.precedence,
    formula: "1 + 2 < 4",
    shape: NOTHING,
    values: {},
    expected: answersBoolean(true),
    // Read as `(1 + 2) < 4`. Read the other way there is no formula at all.
  },
  {
    name: "addition binds tighter than comparison, answering false",
    group: "precedence-and-grouping",
    from: L.precedence,
    claim: C.precedence,
    formula: "1 + 2 < 3",
    shape: NOTHING,
    values: {},
    expected: answersBoolean(false),
  },
  {
    name: "multiplication binds tighter than comparison",
    group: "precedence-and-grouping",
    from: L.precedence,
    claim: C.precedence,
    formula: "2 * 3 == 6",
    shape: NOTHING,
    values: {},
    expected: answersBoolean(true),
  },
  {
    name: "comparison binds tighter than and, on both sides",
    group: "precedence-and-grouping",
    from: L.precedence,
    claim: C.precedence,
    formula: "1 < 2 && 3 < 4",
    shape: NOTHING,
    values: {},
    expected: answersBoolean(true),
  },
  {
    name: "comparison binds tighter than and, answering false",
    group: "precedence-and-grouping",
    from: L.precedence,
    claim: C.precedence,
    formula: "1 < 2 && 4 < 3",
    shape: NOTHING,
    values: {},
    expected: answersBoolean(false),
  },
  {
    name: "and binds tighter than fallback",
    group: "precedence-and-grouping",
    from: L.precedence,
    claim: C.precedence,
    formula: "{flag} && true ?? false",
    shape: FLAG,
    values: {},
    expected: answersBoolean(false),
    // Read as `({flag} && true) ?? false`. `{flag}` is absent, so the `&&`
    // answers absent, and the fallback then answers false. Were `??` the
    // tighter of the two it would read `{flag} && (true ?? false)`, which is
    // `absent && true`, which is absent — so a value against absent is what
    // tells the two readings apart.
    //
    // `false && absent ?? true` cannot do this job: under the short circuit
    // both readings answer false.
  },
  {
    name: "and binds tighter than fallback, with the left side present",
    group: "precedence-and-grouping",
    from: L.precedence,
    claim: C.precedence,
    formula: "true && false ?? true",
    shape: NOTHING,
    values: {},
    expected: answersBoolean(false),
    // `(true && false) ?? true` is false; the left side is there, so the
    // fallback keeps it. Both readings of the ladder answer false here, so
    // this pins the answer rather than telling them apart.
  },
  {
    name: "fallback is loosest, over a comparison on its right",
    group: "precedence-and-grouping",
    from: L.precedence,
    claim: C.precedence,
    formula: "{flag} ?? 1 < 2",
    shape: FLAG,
    values: {},
    expected: answersBoolean(true),
    // Read as `{flag} ?? (1 < 2)`. Read the other way, `({flag} ?? 1)` would
    // put a boolean-or-number against `< 2` and be refused at check.
  },
  {
    name: "fallback is loosest, over a comparison on its left",
    group: "precedence-and-grouping",
    from: L.precedence,
    claim: C.precedence,
    formula: "{count} > 2 ?? false",
    shape: COUNT,
    values: {},
    expected: answersBoolean(false),
    // `({count} > 2)` is absent because `{count}` is; the fallback then
    // answers false.
  },
  {
    name: "the whole precedence ladder in one formula",
    group: "precedence-and-grouping",
    from: L.precedence,
    claim: C.precedence,
    formula: "1 + 2 * 3 > 5 && 2 - 1 < 2",
    shape: NOTHING,
    values: {},
    expected: answersBoolean(true),
    // `((1 + (2 * 3)) > 5) && ((2 - 1) < 2)`.
  },
]

// ---------------------------------------------------------------------------
// The case form
// ---------------------------------------------------------------------------

const caseForm_: FormulaCase[] = [
  {
    name: "a case answers the value of its first passing row",
    group: "case-form",
    from: L.chooseWithCase,
    claim: C.chooseWithCase,
    formula: caseForm([{ test: "{count} > 10", value: '"many"' }], '"few"'),
    shape: COUNT,
    values: { count: num(20) },
    expected: answersText("many"),
  },
  {
    name: "a case answers its otherwise row where no test passes",
    group: "case-form",
    from: L.everyCaseOtherwise,
    claim: C.everyCaseOtherwise,
    formula: caseForm([{ test: "{count} > 10", value: '"many"' }], '"few"'),
    shape: COUNT,
    values: { count: num(2) },
    expected: answersText("few"),
  },
  {
    name: "a case with several rows answers the first that passes",
    group: "case-form",
    from: L.chooseWithCase,
    claim: C.chooseWithCase,
    formula: caseForm(
      [
        { test: "{count} > 100", value: '"huge"' },
        { test: "{count} > 10", value: '"many"' },
        { test: "{count} > 0", value: '"some"' },
      ],
      '"none"'
    ),
    shape: COUNT,
    values: { count: num(50) },
    expected: answersText("many"),
  },
  {
    name: "an earlier row wins over a later one that would also pass",
    group: "case-form",
    from: L.chooseWithCase,
    claim: C.chooseWithCase,
    formula: caseForm(
      [
        { test: "{count} > 0", value: '"first"' },
        { test: "{count} > 0", value: '"second"' },
      ],
      '"none"'
    ),
    shape: COUNT,
    values: { count: num(1) },
    expected: answersText("first"),
  },
  {
    name: "a case falls to otherwise where every row fails",
    group: "case-form",
    from: L.everyCaseOtherwise,
    claim: C.everyCaseOtherwise,
    formula: caseForm(
      [
        { test: "{count} > 100", value: '"huge"' },
        { test: "{count} > 10", value: '"many"' },
      ],
      '"none"'
    ),
    shape: COUNT,
    values: { count: num(1) },
    expected: answersText("none"),
  },
  {
    name: "a case with only an otherwise row answers it",
    group: "case-form",
    from: L.everyCaseOtherwise,
    claim: C.everyCaseOtherwise,
    formula: caseForm([], '"always"'),
    shape: NOTHING,
    values: {},
    expected: answersText("always"),
  },
  {
    name: "a case row whose test answers absent does not match",
    group: "case-form",
    from: L.rowMatchesOnTrue,
    claim: C.rowMatchesOnTrue,
    formula: caseForm([{ test: "{count} > 10", value: '"many"' }], '"unknown"'),
    shape: COUNT,
    values: {},
    expected: answersText("unknown"),
    // `{count}` is absent, so `{count} > 10` is absent, and a row matches only
    // where its test answers true.
  },
  {
    name: "a row whose test answers absent falls to the next row, not to otherwise",
    group: "case-form",
    from: L.rowMatchesOnTrue,
    claim: C.rowMatchesOnTrue,
    formula: caseForm(
      [
        { test: "{count} > 10", value: '"many"' },
        { test: "{other} > 1", value: '"other"' },
      ],
      '"unknown"'
    ),
    shape: MIXED,
    values: { other: num(5) },
    expected: answersText("other"),
  },
  {
    name: "a row whose test is the word absent does not match",
    group: "case-form",
    from: L.rowMatchesOnTrue,
    claim: C.rowMatchesOnTrue,
    formula: caseForm([{ test: "absent", value: '"matched"' }], '"fell through"'),
    shape: NOTHING,
    values: {},
    expected: answersText("fell through"),
  },
  {
    name: "a row whose test is false does not match",
    group: "case-form",
    from: L.rowMatchesOnTrue,
    claim: C.rowMatchesOnTrue,
    formula: caseForm([{ test: "false", value: '"matched"' }], '"fell through"'),
    shape: NOTHING,
    values: {},
    expected: answersText("fell through"),
  },
  {
    name: "only the winning row's value is worked out",
    group: "case-form",
    from: L.onlyWinningRow,
    claim: C.onlyWinningRow,
    formula: caseForm([{ test: "true", value: "1" }], "{count} / 0"),
    shape: COUNT,
    values: { count: num(9) },
    expected: answersNumber(1),
    // Were every row worked out, the otherwise row's division by zero would be
    // absent and an eager implementation could let that absent carry out. The
    // answer is the winning row's value alone.
  },
  {
    name: "a losing row holding a division by zero does not reach the answer",
    group: "case-form",
    from: L.onlyWinningRow,
    claim: C.onlyWinningRow,
    formula: caseForm(
      [
        { test: "{count} == 0", value: "{other} / {count}" },
        { test: "true", value: "{other}" },
      ],
      "0"
    ),
    shape: MIXED,
    values: { count: num(2), other: num(10) },
    expected: answersNumber(10),
  },
  {
    name: "a losing row's value reading an absent key does not reach the answer",
    group: "case-form",
    from: L.onlyWinningRow,
    claim: C.onlyWinningRow,
    formula: caseForm([{ test: "true", value: '"here"' }], "{name}"),
    shape: NAME,
    values: {},
    expected: answersText("here"),
  },
  {
    name: "the otherwise row's value is worked out where it wins",
    group: "case-form",
    from: L.onlyWinningRow,
    claim: C.onlyWinningRow,
    formula: caseForm([{ test: "false", value: "1" }], "{count} + 1"),
    shape: COUNT,
    values: { count: num(4) },
    expected: answersNumber(5),
  },
  {
    name: "a case answering absent from its winning row",
    group: "case-form",
    from: L.chooseWithCase,
    claim: C.chooseWithCase,
    formula: caseForm([{ test: "true", value: "{name}" }], '"other"'),
    shape: NAME,
    values: {},
    expected: ABSENT,
  },
  {
    name: "a case answering a number",
    group: "case-form",
    from: L.chooseWithCase,
    claim: C.chooseWithCase,
    formula: caseForm([{ test: "{flag}", value: "10" }], "0"),
    shape: FLAG,
    values: { flag: bool(true) },
    expected: answersNumber(10),
  },
  {
    name: "a case answering a boolean",
    group: "case-form",
    from: L.chooseWithCase,
    claim: C.chooseWithCase,
    formula: caseForm([{ test: "{count} > 0", value: "true" }], "false"),
    shape: COUNT,
    values: { count: num(1) },
    expected: answersBoolean(true),
  },
  {
    name: "a case whose value is a text literal holding a reference",
    group: "case-form",
    from: L.referenceInText,
    claim: C.referenceInText,
    formula: caseForm([{ test: "{count} > 0", value: '"{count} of them"' }], '"none"'),
    shape: COUNT,
    values: { count: num(3) },
    expected: answersText("3 of them"),
    // Filling a number into a text literal is not settled by the
    // specification; see the questions this corpus was handed back with.
  },
  {
    name: "a case with no otherwise row is refused",
    group: "case-form",
    from: L.everyCaseOtherwise,
    claim: C.everyCaseOtherwise,
    formula: caseFormWithoutOtherwise([
      { test: "{count} > 10", value: '"many"' },
      { test: "{count} > 0", value: '"some"' },
    ]),
    shape: COUNT,
    values: { count: num(20) },
    expected: refused("read", "case-missing-otherwise"),
    // Refused even though a row would have passed: the fault is in the form,
    // not in this page's values.
  },
  {
    name: "a case with no rows at all is refused",
    group: "case-form",
    from: L.everyCaseOtherwise,
    claim: C.everyCaseOtherwise,
    formula: caseFormWithoutOtherwise([]),
    shape: NOTHING,
    values: {},
    expected: refused("read", "case-missing-otherwise"),
  },
  {
    name: "a case row whose test is a number is refused",
    group: "case-form",
    from: L.rowMatchesOnTrue,
    claim: C.rowMatchesOnTrue,
    formula: caseForm([{ test: "{count}", value: '"yes"' }], '"no"'),
    shape: COUNT,
    values: { count: num(1) },
    expected: refused("check", "types-do-not-meet", ["count", "number"]),
    // A row matches where its test answers true, so a test is a boolean.
  },
  {
    name: "a case row whose test is a text is refused",
    group: "case-form",
    from: L.rowMatchesOnTrue,
    claim: C.rowMatchesOnTrue,
    formula: caseForm([{ test: '"yes"', value: "1" }], "0"),
    shape: NOTHING,
    values: {},
    expected: refused("check", "types-do-not-meet", ["text"]),
  },
  {
    name: "a case whose rows answer different kinds of value is refused",
    group: "case-form",
    from: L.typesMeet,
    claim: C.typesMeet,
    formula: caseForm([{ test: "true", value: "1" }], '"one"'),
    shape: NOTHING,
    values: {},
    expected: refused("check", "types-do-not-meet", ["number", "text"]),
  },
  {
    name: "a case whose losing row names an undeclared key is still refused",
    group: "case-form",
    from: L.undeclaredKey,
    claim: C.undeclaredKey,
    formula: caseForm(
      [
        { test: "true", value: "1" },
        { test: "{missing} > 0", value: "2" },
      ],
      "3"
    ),
    shape: COUNT,
    values: { count: num(1) },
    expected: refused("check", "undeclared-key", ["missing"]),
    // The check reads the whole formula; only running it stops at the winner.
  },
  {
    name: "a case nested inside a case row's value",
    group: "case-form",
    from: L.chooseWithCase,
    claim: C.chooseWithCase,
    formula: caseForm(
      [
        {
          test: "{count} > 0",
          value: caseForm([{ test: "{count} > 10", value: '"many"' }], '"some"'),
        },
      ],
      '"none"'
    ),
    shape: COUNT,
    values: { count: num(5) },
    expected: answersText("some"),
  },
  {
    name: "a case written without its parentheses is refused",
    group: "case-form",
    from: L.caseSpelling,
    claim: C.caseSpelling,
    formula: 'case {count} > 10 -> "many", otherwise -> "none"',
    shape: COUNT,
    values: { count: num(20) },
    expected: refused("read", "unreadable"),
  },
  {
    name: "a case closed with a word rather than a parenthesis is refused",
    group: "case-form",
    from: L.caseSpelling,
    claim: C.caseSpelling,
    formula: 'case({count} > 10 -> "many", otherwise -> "none") end',
    shape: COUNT,
    values: { count: num(20) },
    expected: refused("read", "unreadable"),
  },
  {
    name: "case rows run together without a comma are refused",
    group: "case-form",
    from: L.caseSpelling,
    claim: C.caseSpelling,
    formula: 'case({count} > 10 -> "many" otherwise -> "none")',
    shape: COUNT,
    values: { count: num(20) },
    expected: refused("read", "unreadable"),
  },
  {
    name: "a case row written with a colon rather than an arrow is refused",
    group: "case-form",
    from: L.caseRowSpelling,
    claim: C.caseRowSpelling,
    formula: 'case({count} > 10: "many", otherwise: "none")',
    shape: COUNT,
    values: { count: num(20) },
    expected: refused("read", "unreadable"),
  },
  {
    name: "a case row written with the word then is refused",
    group: "case-form",
    from: L.caseRowSpelling,
    claim: C.caseRowSpelling,
    formula: 'case({count} > 10 then "many", otherwise then "none")',
    shape: COUNT,
    values: { count: num(20) },
    expected: refused("read", "unreadable"),
  },
  {
    name: "an otherwise row written with another word is refused",
    group: "case-form",
    from: L.otherwiseSpelling,
    claim: C.otherwiseSpelling,
    formula: 'case({count} > 10 -> "many", else -> "none")',
    shape: COUNT,
    values: { count: num(20) },
    expected: refused("read", "case-missing-otherwise", ["otherwise"]),
  },
  {
    name: "choosing with a conditional expression rather than a case is refused",
    group: "case-form",
    from: L.chooseWithCase,
    claim: C.chooseWithCase,
    formula: '{count} > 0 ? "some" : "none"',
    shape: COUNT,
    values: { count: num(1) },
    expected: refused("read", "choice-without-a-case"),
  },
  {
    name: "choosing with an if is refused",
    group: "case-form",
    from: L.chooseWithCase,
    claim: C.chooseWithCase,
    formula: 'if {count} > 0 then "some" else "none"',
    shape: COUNT,
    values: { count: num(1) },
    expected: refused("read", "choice-without-a-case"),
  },
  {
    name: "choosing with a function call is refused",
    group: "case-form",
    from: L.chooseWithCase,
    claim: C.chooseWithCase,
    formula: 'if({count} > 0, "some", "none")',
    shape: COUNT,
    values: { count: num(1) },
    expected: refused("read", "choice-without-a-case"),
  },
]

// ---------------------------------------------------------------------------
// Functions
// ---------------------------------------------------------------------------

const functions: FormulaCase[] = [
  {
    name: "hours between two instants",
    group: "functions",
    from: L.fnHoursBetween,
    claim: C.fnHoursBetween,
    formula: call("hoursBetween", "{start}", "{finish}"),
    shape: MIXED,
    values: {
      start: instant("2026-01-01T00:00:00Z"),
      finish: instant("2026-01-01T05:00:00Z"),
    },
    expected: answersNumber(5),
  },
  {
    name: "hours between two instants, fractional",
    group: "functions",
    from: L.fnHoursBetween,
    claim: C.fnHoursBetween,
    formula: call("hoursBetween", "{start}", "{finish}"),
    shape: MIXED,
    values: {
      start: instant("2026-01-01T00:00:00Z"),
      finish: instant("2026-01-01T01:30:00Z"),
    },
    expected: answersNumber(1.5),
  },
  {
    name: "hours between one instant and itself is zero",
    group: "functions",
    from: L.fnHoursBetween,
    claim: C.fnHoursBetween,
    formula: call("hoursBetween", "{start}", "{start}"),
    shape: MIXED,
    values: { start: instant("2026-01-01T00:00:00Z") },
    expected: answersNumber(0),
  },
  {
    name: "hours between instants crossing a day boundary",
    group: "functions",
    from: L.fnHoursBetween,
    claim: C.fnHoursBetween,
    formula: call("hoursBetween", "{start}", "{finish}"),
    shape: MIXED,
    values: {
      start: instant("2026-01-01T23:00:00Z"),
      finish: instant("2026-01-02T02:00:00Z"),
    },
    expected: answersNumber(3),
  },
  {
    name: "now is the moment the formula is worked out",
    group: "functions",
    from: L.fnNow,
    claim: C.fnNow,
    formula: call("hoursBetween", "{start}", call("now")),
    shape: MIXED,
    values: { start: instant("2026-01-01T00:00:00Z") },
    now: "2026-01-01T03:00:00Z",
    expected: answersNumber(3),
  },
  {
    name: "now answers one moment for the whole working-out",
    group: "functions",
    from: L.fnNow,
    claim: C.fnNow,
    formula: call("hoursBetween", call("now"), call("now")),
    shape: NOTHING,
    values: {},
    now: "2026-01-01T03:00:00Z",
    expected: answersNumber(0),
    // "the moment the formula is worked out" is one moment, so two calls in
    // one formula answer the same instant.
  },
  {
    name: "hours between with an absent instant",
    group: "functions",
    from: L.fnHoursBetween,
    claim: C.fnHoursBetween,
    formula: call("hoursBetween", "{start}", "{finish}"),
    shape: MIXED,
    values: { start: instant("2026-01-01T00:00:00Z") },
    expected: ABSENT,
    // See the questions: the specification states this for operators and not
    // for functions. This case takes the reading that a function given an
    // absent value answers absent, matching
    // `language-failure.domain.md:37`, "Let one absent value stop the whole
    // answer."
  },
  {
    name: "contains answers true where the list holds the value",
    group: "functions",
    from: L.fnContains,
    claim: C.fnContains,
    formula: call("contains", "{tags}", '"green"'),
    shape: MIXED,
    values: { tags: listOfValues(text("red"), text("green")) },
    expected: answersBoolean(true),
  },
  {
    name: "contains answers false where the list does not hold the value",
    group: "functions",
    from: L.fnContains,
    claim: C.fnContains,
    formula: call("contains", "{tags}", '"blue"'),
    shape: MIXED,
    values: { tags: listOfValues(text("red"), text("green")) },
    expected: answersBoolean(false),
  },
  {
    name: "contains answers false over an empty list",
    group: "functions",
    from: L.fnContains,
    claim: C.fnContains,
    formula: call("contains", "{tags}", '"green"'),
    shape: MIXED,
    values: { tags: listOfValues() },
    expected: answersBoolean(false),
  },
  {
    name: "contains over a list of numbers",
    group: "functions",
    from: L.fnContains,
    claim: C.fnContains,
    formula: call("contains", "{scores}", "3"),
    shape: MIXED,
    values: { scores: listOfValues(num(1), num(2), num(3)) },
    expected: answersBoolean(true),
  },
  {
    name: "contains matches a whole element, not a part of one",
    group: "functions",
    from: L.fnContains,
    claim: C.fnContains,
    formula: call("contains", "{tags}", '"gree"'),
    shape: MIXED,
    values: { tags: listOfValues(text("green")) },
    expected: answersBoolean(false),
  },
  {
    name: "has word answers true where the text holds the word",
    group: "functions",
    from: L.fnHasWord,
    claim: C.fnHasWord,
    formula: call("hasWord", '"red green blue"', '"green"'),
    shape: NOTHING,
    values: {},
    expected: answersBoolean(true),
  },
  {
    name: "has word answers false where the word is only part of a longer one",
    group: "functions",
    from: L.fnHasWord,
    claim: C.fnHasWord,
    formula: call("hasWord", '"greenhouse gases"', '"green"'),
    shape: NOTHING,
    values: {},
    expected: answersBoolean(false),
    // "bounded at both ends" is what makes this false; a substring test would
    // answer true.
  },
  {
    name: "has word answers false where the word is only the end of a longer one",
    group: "functions",
    from: L.fnHasWord,
    claim: C.fnHasWord,
    formula: call("hasWord", '"evergreen leaves"', '"green"'),
    shape: NOTHING,
    values: {},
    expected: answersBoolean(false),
  },
  {
    name: "has word answers true where the word is the whole text",
    group: "functions",
    from: L.fnHasWord,
    claim: C.fnHasWord,
    formula: call("hasWord", '"green"', '"green"'),
    shape: NOTHING,
    values: {},
    expected: answersBoolean(true),
    // The ends of the text bound the word at both ends.
  },
  {
    name: "has word answers true for the first word of a text",
    group: "functions",
    from: L.fnHasWord,
    claim: C.fnHasWord,
    formula: call("hasWord", '"green day units"', '"green"'),
    shape: NOTHING,
    values: {},
    expected: answersBoolean(true),
  },
  {
    name: "has word answers true for the last word of a text",
    group: "functions",
    from: L.fnHasWord,
    claim: C.fnHasWord,
    formula: call("hasWord", '"units green day green"', '"day"'),
    shape: NOTHING,
    values: {},
    expected: answersBoolean(true),
  },
  {
    name: "has word over a reference",
    group: "functions",
    from: L.fnHasWord,
    claim: C.fnHasWord,
    formula: call("hasWord", "{name}", '"cat"'),
    shape: NAME,
    values: { name: text("the cat sat") },
    expected: answersBoolean(true),
  },
  {
    name: "has word answers false over empty text",
    group: "functions",
    from: L.fnHasWord,
    claim: C.fnHasWord,
    formula: call("hasWord", '""', '"green"'),
    shape: NOTHING,
    values: {},
    expected: answersBoolean(false),
  },
  {
    name: "a function this language does not have is refused",
    group: "functions",
    from: L.noUpperFunction,
    claim: C.noUpperFunction,
    formula: call("upper", "{name}"),
    shape: NAME,
    values: { name: text("astra") },
    expected: refused("check", "unknown-function", ["upper"]),
  },
  {
    name: "a substring test is not a function this language has",
    group: "functions",
    from: L.noIncludesFunction,
    claim: C.noIncludesFunction,
    formula: call("includes", "{name}", '"a"'),
    shape: NAME,
    values: { name: text("astra") },
    expected: refused("check", "unknown-function", ["includes"]),
  },
  {
    name: "hours between given one argument is refused",
    group: "functions",
    from: L.fnHoursBetween,
    claim: C.fnHoursBetween,
    formula: call("hoursBetween", "{start}"),
    shape: MIXED,
    values: { start: instant("2026-01-01T00:00:00Z") },
    expected: refused("check", "wrong-argument-count", ["hoursBetween"]),
  },
  {
    name: "hours between given three arguments is refused",
    group: "functions",
    from: L.fnHoursBetween,
    claim: C.fnHoursBetween,
    formula: call("hoursBetween", "{start}", "{finish}", "{start}"),
    shape: MIXED,
    values: {},
    expected: refused("check", "wrong-argument-count", ["hoursBetween"]),
  },
  {
    name: "now given an argument is refused",
    group: "functions",
    from: L.fnNow,
    claim: C.fnNow,
    formula: call("hoursBetween", "{start}", call("now", "{start}")),
    shape: MIXED,
    values: {},
    expected: refused("check", "wrong-argument-count", ["now"]),
  },
  {
    name: "contains given one argument is refused",
    group: "functions",
    from: L.fnContains,
    claim: C.fnContains,
    formula: call("contains", "{tags}"),
    shape: MIXED,
    values: {},
    expected: refused("check", "wrong-argument-count", ["contains"]),
  },
  {
    name: "has word given one argument is refused",
    group: "functions",
    from: L.fnHasWord,
    claim: C.fnHasWord,
    formula: call("hasWord", "{name}"),
    shape: NAME,
    values: {},
    expected: refused("check", "wrong-argument-count", ["hasWord"]),
  },
  {
    name: "hours between given a number is refused",
    group: "functions",
    from: L.fnHoursBetween,
    claim: C.fnHoursBetween,
    formula: call("hoursBetween", "{start}", "{count}"),
    shape: MIXED,
    values: {},
    expected: refused("check", "types-do-not-meet", ["count", "number", "instant"]),
  },
  {
    name: "contains given something other than a list is refused",
    group: "functions",
    from: L.fnContains,
    claim: C.fnContains,
    formula: call("contains", "{name}", '"a"'),
    shape: NAME,
    values: { name: text("astra") },
    expected: refused("check", "types-do-not-meet", ["name", "text"]),
  },
  {
    name: "contains looking for a value of a different kind than the list holds",
    group: "functions",
    from: L.fnContains,
    claim: C.fnContains,
    formula: call("contains", "{tags}", "3"),
    shape: MIXED,
    values: {},
    expected: refused("check", "types-do-not-meet", ["tags", "text", "number"]),
  },
  {
    name: "has word given a number is refused",
    group: "functions",
    from: L.fnHasWord,
    claim: C.fnHasWord,
    formula: call("hasWord", "{count}", '"3"'),
    shape: MIXED,
    values: {},
    expected: refused("check", "types-do-not-meet", ["count", "number", "text"]),
  },
  {
    name: "has word given a number as its word is refused",
    group: "functions",
    from: L.fnHasWord,
    claim: C.fnHasWord,
    formula: call("hasWord", "{name}", "3"),
    shape: MIXED,
    values: {},
    expected: refused("check", "types-do-not-meet", ["number", "text"]),
  },
  {
    name: "a function name without a call is not a word standing for a value",
    group: "functions",
    from: L.callSpelling,
    claim: C.callSpelling,
    formula: "now",
    shape: NOTHING,
    values: {},
    expected: refused("read", "unknown-word", ["now"]),
  },
  {
    name: "a call written without its parentheses is refused",
    group: "functions",
    from: L.callSpelling,
    claim: C.callSpelling,
    formula: 'hasWord {name} "cat"',
    shape: NAME,
    values: { name: text("the cat sat") },
    expected: refused("read", "unreadable"),
  },
]

// ---------------------------------------------------------------------------
// Absence carrying through
// ---------------------------------------------------------------------------

const absence: FormulaCase[] = [
  {
    name: "plus given an absent left side answers absent",
    group: "absence",
    from: L.absentOperator,
    claim: C.absentOperator,
    formula: "{count} + 1",
    shape: COUNT,
    values: {},
    expected: ABSENT,
  },
  {
    name: "plus given an absent right side answers absent",
    group: "absence",
    from: L.absentOperator,
    claim: C.absentOperator,
    formula: "1 + {count}",
    shape: COUNT,
    values: {},
    expected: ABSENT,
  },
  {
    name: "minus given an absent value answers absent",
    group: "absence",
    from: L.absentOperator,
    claim: C.absentOperator,
    formula: "{count} - 1",
    shape: COUNT,
    values: {},
    expected: ABSENT,
  },
  {
    name: "times given an absent value answers absent",
    group: "absence",
    from: L.absentOperator,
    claim: C.absentOperator,
    formula: "{count} * 2",
    shape: COUNT,
    values: {},
    expected: ABSENT,
  },
  {
    name: "times by zero given an absent value still answers absent",
    group: "absence",
    from: L.absentOperator,
    claim: C.absentOperator,
    formula: "{count} * 0",
    shape: COUNT,
    values: {},
    expected: ABSENT,
  },
  {
    name: "divide given an absent value answers absent",
    group: "absence",
    from: L.absentOperator,
    claim: C.absentOperator,
    formula: "{count} / 2",
    shape: COUNT,
    values: {},
    expected: ABSENT,
  },
  {
    name: "less than given an absent value answers absent",
    group: "absence",
    from: L.absentOperator,
    claim: C.absentOperator,
    formula: "{count} < 1",
    shape: COUNT,
    values: {},
    expected: ABSENT,
  },
  {
    name: "at most given an absent value answers absent",
    group: "absence",
    from: L.absentOperator,
    claim: C.absentOperator,
    formula: "{count} <= 1",
    shape: COUNT,
    values: {},
    expected: ABSENT,
  },
  {
    name: "more than given an absent value answers absent",
    group: "absence",
    from: L.absentOperator,
    claim: C.absentOperator,
    formula: "1 > {count}",
    shape: COUNT,
    values: {},
    expected: ABSENT,
  },
  {
    name: "at least given an absent value answers absent",
    group: "absence",
    from: L.absentOperator,
    claim: C.absentOperator,
    formula: "1 >= {count}",
    shape: COUNT,
    values: {},
    expected: ABSENT,
  },
  {
    name: "and given an absent right side answers absent",
    group: "absence",
    from: L.absentOperator,
    claim: C.absentOperator,
    formula: "true && {flag}",
    shape: FLAG,
    values: {},
    expected: ABSENT,
  },
  {
    name: "and given an absent left side answers absent",
    group: "absence",
    from: L.absentOperator,
    claim: C.absentOperator,
    formula: "{flag} && true",
    shape: FLAG,
    values: {},
    expected: ABSENT,
  },
  {
    name: "a false left side answers false without reaching an absent right",
    group: "absence",
    from: L.shortCircuit,
    claim: C.shortCircuit,
    formula: "false && {flag}",
    shape: FLAG,
    values: {},
    expected: answersBoolean(false),
    // `&&` answers from its false left alone, so it never reaches `{flag}`.
    // Never reaching it is exactly why `formula-absent-value.domain.md:15`
    // leaves this alone: that line catches an operator that *reaches* an
    // absent value. An implementation working out both sides answers absent
    // and fails here.
  },
  {
    name: "an absent left side answers absent without working out its right",
    group: "absence",
    from: L.shortCircuit,
    claim: C.shortCircuit,
    formula: "{flag} && {count} / 0 > 0",
    shape: MIXED,
    values: { count: num(1) },
    expected: ABSENT,
    // `&&` answers from its absent left alone. Both a short-circuiting and an
    // eager implementation answer absent here, so this pins the answer rather
    // than telling the two apart.
  },
  {
    name: "and given the word absent answers absent",
    group: "absence",
    from: L.absentOperator,
    claim: C.absentOperator,
    formula: "true && absent",
    shape: NOTHING,
    values: {},
    expected: ABSENT,
  },
  {
    name: "absence carries up through nested operators",
    group: "absence",
    from: L.absentOperator,
    claim: C.absentOperator,
    formula: "({count} + 1) * 2",
    shape: COUNT,
    values: {},
    expected: ABSENT,
  },
  {
    name: "absence in one arm does not spare the other arm's operator",
    group: "absence",
    from: L.absentOperator,
    claim: C.absentOperator,
    formula: "{count} + {other} * 2",
    shape: MIXED,
    values: { other: num(3) },
    expected: ABSENT,
  },
  {
    name: "equal against absent answers a boolean, not absent",
    group: "absence",
    from: L.absentEquality,
    claim: C.absentEquality,
    formula: "{count} == absent",
    shape: COUNT,
    values: {},
    expected: answersBoolean(true),
  },
  {
    name: "equal against absent answers false where the value is there",
    group: "absence",
    from: L.absentEquality,
    claim: C.absentEquality,
    formula: "{count} == absent",
    shape: COUNT,
    values: { count: num(0) },
    expected: answersBoolean(false),
  },
  {
    name: "an absent value is not equal to a number",
    group: "absence",
    from: L.absentEquality,
    claim: C.absentEquality,
    formula: "{count} == 1",
    shape: COUNT,
    values: {},
    expected: answersBoolean(false),
  },
  {
    name: "a number is not equal to an absent value, the other way round",
    group: "absence",
    from: L.absentEquality,
    claim: C.absentEquality,
    formula: "1 == {count}",
    shape: COUNT,
    values: {},
    expected: answersBoolean(false),
  },
  {
    name: "an absent value is not equal to zero",
    group: "absence",
    from: L.absentEquality,
    claim: C.absentEquality,
    formula: "{count} == 0",
    shape: COUNT,
    values: {},
    expected: answersBoolean(false),
  },
  {
    name: "an absent value is not equal to empty text",
    group: "absence",
    from: L.absentEquality,
    claim: C.absentEquality,
    formula: '{name} == ""',
    shape: NAME,
    values: {},
    expected: answersBoolean(false),
  },
  {
    name: "an absent value is not equal to false",
    group: "absence",
    from: L.absentEquality,
    claim: C.absentEquality,
    formula: "{flag} == false",
    shape: FLAG,
    values: {},
    expected: answersBoolean(false),
  },
  {
    name: "absent equals absent",
    group: "absence",
    from: L.absentEquality,
    claim: C.absentEquality,
    formula: "absent == absent",
    shape: NOTHING,
    values: {},
    expected: answersBoolean(true),
  },
  {
    name: "two absent keys are equal",
    group: "absence",
    from: L.absentEquality,
    claim: C.absentEquality,
    formula: "{count} == {other}",
    shape: MIXED,
    values: {},
    expected: answersBoolean(true),
  },
  {
    name: "an absent key is not equal to a present one",
    group: "absence",
    from: L.absentEquality,
    claim: C.absentEquality,
    formula: "{count} == {other}",
    shape: MIXED,
    values: { other: num(1) },
    expected: answersBoolean(false),
  },
  {
    name: "not-equal against absent answers a boolean, not absent",
    group: "absence",
    from: L.absentEquality,
    claim: C.absentEquality,
    formula: "{count} != absent",
    shape: COUNT,
    values: {},
    expected: answersBoolean(false),
  },
  {
    name: "not-equal against absent answers true where the value is there",
    group: "absence",
    from: L.absentEquality,
    claim: C.absentEquality,
    formula: "{count} != absent",
    shape: COUNT,
    values: { count: num(5) },
    expected: answersBoolean(true),
  },
  {
    name: "an absent value differs from a number",
    group: "absence",
    from: L.absentEquality,
    claim: C.absentEquality,
    formula: "{count} != 1",
    shape: COUNT,
    values: {},
    expected: answersBoolean(true),
  },
  {
    name: "absent does not differ from absent",
    group: "absence",
    from: L.absentEquality,
    claim: C.absentEquality,
    formula: "absent != absent",
    shape: NOTHING,
    values: {},
    expected: answersBoolean(false),
  },
  {
    name: "an equality against absent can be tested by a case row",
    group: "absence",
    from: L.absentEquality,
    claim: C.absentEquality,
    formula: caseForm([{ test: "{count} == absent", value: '"missing"' }], '"there"'),
    shape: COUNT,
    values: {},
    expected: answersText("missing"),
    // The equality answers a boolean rather than absent, so the row can match.
  },
  {
    name: "an absent value stops the whole answer where no fallback catches it",
    group: "absence",
    from: L.absentStopsAnswer,
    claim: C.absentStopsAnswer,
    formula: "{count} + {other} + 1",
    shape: MIXED,
    values: { other: num(2) },
    expected: ABSENT,
  },
]

// ---------------------------------------------------------------------------
// A checked formula never fails
// ---------------------------------------------------------------------------

const neverFails: FormulaCase[] = [
  {
    name: "reading a key the page holds nothing under answers absent rather than failing",
    group: "never-fails",
    from: L.neverFails,
    claim: C.neverFails,
    formula: "{name}",
    shape: NAME,
    values: {},
    expected: ABSENT,
  },
  {
    name: "every operand absent answers absent rather than failing",
    group: "never-fails",
    from: L.neverFails,
    claim: C.neverFails,
    formula: "{count} * {other} / {count}",
    shape: MIXED,
    values: {},
    expected: ABSENT,
  },
  {
    name: "a division by zero inside a text literal's reference chain",
    group: "never-fails",
    from: L.neverFails,
    claim: C.neverFails,
    formula: "{ratio}",
    shape: {
      count: { type: NUMBER },
      other: { type: NUMBER },
      ratio: { type: NUMBER, formula: "{count} / {other}" },
    },
    values: { count: num(1), other: num(0) },
    expected: ABSENT,
  },
  {
    name: "a page holding no values at all answers absent rather than failing",
    group: "never-fails",
    from: L.neverFails,
    claim: C.neverFails,
    formula: "{count} > 0 && {flag}",
    shape: MIXED,
    values: {},
    expected: ABSENT,
  },
]

// ---------------------------------------------------------------------------
// Refused when the formula is read
// ---------------------------------------------------------------------------

const refusedAtRead: FormulaCase[] = [
  {
    name: "an empty formula is refused",
    group: "refused-at-read",
    from: L.threeMoments,
    claim: C.threeMoments,
    formula: "",
    shape: NOTHING,
    values: {},
    expected: refused("read", "unreadable"),
  },
  {
    name: "a formula of only whitespace is refused",
    group: "refused-at-read",
    from: L.threeMoments,
    claim: C.threeMoments,
    formula: "   ",
    shape: NOTHING,
    values: {},
    expected: refused("read", "unreadable"),
  },
  {
    name: "an empty reference is refused",
    group: "refused-at-read",
    from: L.reference,
    claim: C.reference,
    formula: "{}",
    shape: NOTHING,
    values: {},
    expected: refused("read", "unreadable"),
  },
  {
    name: "an unclosed reference is refused",
    group: "refused-at-read",
    from: L.reference,
    claim: C.reference,
    formula: "{count",
    shape: COUNT,
    values: { count: num(1) },
    expected: refused("read", "unreadable"),
  },
  {
    name: "an unclosed reference inside a text literal is refused",
    group: "refused-at-read",
    from: L.referenceInText,
    claim: C.referenceInText,
    formula: '"hello {name"',
    shape: NAME,
    values: { name: text("astra") },
    expected: refused("read", "unreadable"),
  },
  {
    name: "an operator with nothing on its right is refused",
    group: "refused-at-read",
    from: L.threeMoments,
    claim: C.threeMoments,
    formula: "1 +",
    shape: NOTHING,
    values: {},
    expected: refused("read", "unreadable"),
  },
  {
    name: "an operator with nothing on its left is refused",
    group: "refused-at-read",
    from: L.threeMoments,
    claim: C.threeMoments,
    formula: "* 2",
    shape: NOTHING,
    values: {},
    expected: refused("read", "unreadable"),
  },
  {
    name: "two values side by side with no operator are refused",
    group: "refused-at-read",
    from: L.threeMoments,
    claim: C.threeMoments,
    formula: "1 2",
    shape: NOTHING,
    values: {},
    expected: refused("read", "unreadable"),
  },
  {
    name: "giving a value a name is refused",
    group: "refused-at-read",
    from: L.noNames,
    claim: C.noNames,
    formula: "let x = {count} in x + 1",
    shape: COUNT,
    values: { count: num(1) },
    expected: refused("read", "value-given-a-name"),
  },
  {
    name: "giving a value a name with an assignment is refused",
    group: "refused-at-read",
    from: L.noNames,
    claim: C.noNames,
    formula: "x = {count}; x + 1",
    shape: COUNT,
    values: { count: num(1) },
    expected: refused("read", "value-given-a-name"),
  },
  {
    name: "naming a value with a lambda argument is refused",
    group: "refused-at-read",
    from: L.noNames,
    claim: C.noNames,
    formula: "(x) => x + 1",
    shape: NOTHING,
    values: {},
    expected: refused("read", "value-given-a-name"),
  },
  {
    name: "a dotted path off a reference is refused",
    group: "refused-at-read",
    from: L.reference,
    claim: C.reference,
    formula: "{count}.value",
    shape: COUNT,
    values: { count: num(1) },
    expected: refused("read", "unreadable"),
    // A formula names a property by putting its key between braces, and the
    // specification names no step after that.
  },
  {
    name: "indexing a list is refused",
    group: "refused-at-read",
    from: L.leastPower,
    claim: C.leastPower,
    formula: "{tags}[0]",
    shape: MIXED,
    values: { tags: listOfValues(text("a")) },
    expected: refused("read", "unreadable"),
  },
]

// ---------------------------------------------------------------------------
// Refused for a key the page type does not declare
// ---------------------------------------------------------------------------

const refusedUndeclaredKey: FormulaCase[] = [
  {
    name: "a formula naming a key the page type does not declare is refused",
    group: "refused-undeclared-key",
    from: L.undeclaredKey,
    claim: C.undeclaredKey,
    formula: "{missing}",
    shape: COUNT,
    values: {},
    expected: refused("check", "undeclared-key", ["missing"]),
  },
  {
    name: "the refusal names the key that was not declared",
    group: "refused-undeclared-key",
    from: L.nameTheCause,
    claim: C.nameTheCause,
    formula: "{count} + {missing}",
    shape: COUNT,
    values: { count: num(1) },
    expected: refused("check", "undeclared-key", ["missing"]),
  },
  {
    name: "an undeclared key is refused even where the page holds a value for it",
    group: "refused-undeclared-key",
    from: L.undeclaredKey,
    claim: C.undeclaredKey,
    formula: "{extra}",
    shape: COUNT,
    values: { count: num(1), extra: num(2) },
    expected: refused("check", "undeclared-key", ["extra"]),
    // The shape settles what may be named, not what the page happens to hold.
  },
  {
    name: "an undeclared key inside a text literal is refused",
    group: "refused-undeclared-key",
    from: L.undeclaredKey,
    claim: C.undeclaredKey,
    formula: '"hello {missing}"',
    shape: NAME,
    values: {},
    expected: refused("check", "undeclared-key", ["missing"]),
  },
  {
    name: "an undeclared key inside a function argument is refused",
    group: "refused-undeclared-key",
    from: L.undeclaredKey,
    claim: C.undeclaredKey,
    formula: call("hasWord", "{missing}", '"a"'),
    shape: NAME,
    values: {},
    expected: refused("check", "undeclared-key", ["missing"]),
  },
  {
    name: "an undeclared key behind a fallback is still refused",
    group: "refused-undeclared-key",
    from: L.undeclaredKey,
    claim: C.undeclaredKey,
    formula: "{count} ?? {missing}",
    shape: COUNT,
    values: { count: num(1) },
    expected: refused("check", "undeclared-key", ["missing"]),
    // The check reads the whole formula; that the fallback would never reach
    // its right side is a run-time fact.
  },
  {
    name: "an undeclared key on a side the short circuit never reaches is refused",
    group: "refused-undeclared-key",
    from: L.undeclaredKey,
    claim: C.undeclaredKey,
    formula: "false && {missing}",
    shape: FLAG,
    values: {},
    expected: refused("check", "undeclared-key", ["missing"]),
  },
  {
    name: "a key differing only in case is not the declared key",
    group: "refused-undeclared-key",
    from: L.undeclaredKey,
    claim: C.undeclaredKey,
    formula: "{Count}",
    shape: COUNT,
    values: { count: num(1) },
    expected: refused("check", "undeclared-key", ["Count"]),
  },
  {
    name: "a page type declaring nothing refuses every reference",
    group: "refused-undeclared-key",
    from: L.undeclaredKey,
    claim: C.undeclaredKey,
    formula: "{count}",
    shape: NOTHING,
    values: {},
    expected: refused("check", "undeclared-key", ["count"]),
  },
  {
    name: "a computed key naming an undeclared key is refused",
    group: "refused-undeclared-key",
    from: L.undeclaredKey,
    claim: C.undeclaredKey,
    formula: "{doubled}",
    shape: {
      doubled: { type: NUMBER, formula: "{count} * 2" },
    },
    values: {},
    expected: refused("check", "undeclared-key", ["count"]),
  },
]

// ---------------------------------------------------------------------------
// Refused where the types do not meet
// ---------------------------------------------------------------------------

const refusedTypes: FormulaCase[] = [
  {
    name: "adding a text to a number is refused",
    group: "refused-types-do-not-meet",
    from: L.typesMeet,
    claim: C.typesMeet,
    formula: "{name} + 1",
    shape: MIXED,
    values: { name: text("astra") },
    expected: refused("check", "types-do-not-meet", ["name", "text"]),
  },
  {
    name: "adding a boolean to a number is refused",
    group: "refused-types-do-not-meet",
    from: L.typesMeet,
    claim: C.typesMeet,
    formula: "{flag} + 1",
    shape: MIXED,
    values: { flag: bool(true) },
    expected: refused("check", "types-do-not-meet", ["flag", "boolean"]),
  },
  {
    name: "adding a text that looks like a number is still refused",
    group: "refused-types-do-not-meet",
    from: L.declaredNotGuessed,
    claim: C.declaredNotGuessed,
    formula: "{name} + 1",
    shape: MIXED,
    values: { name: text("41") },
    expected: refused("check", "types-do-not-meet", ["name", "text"]),
    // "Text that looks like a number is still text."
  },
  {
    name: "no conversion is made to let two types meet",
    group: "refused-types-do-not-meet",
    from: L.refuseNotConvert,
    claim: C.refuseNotConvert,
    formula: "{count} + {name}",
    shape: MIXED,
    values: { count: num(1), name: text("2") },
    expected: refused("check", "types-do-not-meet", ["name", "text"]),
  },
  {
    name: "subtracting a text is refused",
    group: "refused-types-do-not-meet",
    from: L.typesMeet,
    claim: C.typesMeet,
    formula: '{name} - "a"',
    shape: MIXED,
    values: {},
    expected: refused("check", "types-do-not-meet", ["text"]),
  },
  {
    name: "multiplying a text is refused",
    group: "refused-types-do-not-meet",
    from: L.typesMeet,
    claim: C.typesMeet,
    formula: "{name} * 2",
    shape: MIXED,
    values: {},
    expected: refused("check", "types-do-not-meet", ["name", "text"]),
  },
  {
    name: "dividing a boolean is refused",
    group: "refused-types-do-not-meet",
    from: L.typesMeet,
    claim: C.typesMeet,
    formula: "{flag} / 2",
    shape: MIXED,
    values: {},
    expected: refused("check", "types-do-not-meet", ["flag", "boolean"]),
  },
  {
    name: "adding a list is refused",
    group: "refused-types-do-not-meet",
    from: L.typesMeet,
    claim: C.typesMeet,
    formula: "{tags} + 1",
    shape: MIXED,
    values: {},
    expected: refused("check", "types-do-not-meet", ["tags", "list"]),
  },
  {
    name: "and over a number is refused",
    group: "refused-types-do-not-meet",
    from: L.typesMeet,
    claim: C.typesMeet,
    formula: "{count} && true",
    shape: MIXED,
    values: { count: num(1) },
    expected: refused("check", "types-do-not-meet", ["count", "number"]),
  },
  {
    name: "and over a text is refused",
    group: "refused-types-do-not-meet",
    from: L.typesMeet,
    claim: C.typesMeet,
    formula: '{name} && "yes"',
    shape: MIXED,
    values: {},
    expected: refused("check", "types-do-not-meet", ["name", "text"]),
  },
  {
    name: "and over a number on its right is refused",
    group: "refused-types-do-not-meet",
    from: L.typesMeet,
    claim: C.typesMeet,
    formula: "true && 1",
    shape: NOTHING,
    values: {},
    expected: refused("check", "types-do-not-meet", ["number"]),
  },
  {
    name: "a fallback whose two sides are different kinds is refused",
    group: "refused-types-do-not-meet",
    from: L.typesMeet,
    claim: C.typesMeet,
    formula: '{count} ?? "none"',
    shape: MIXED,
    values: {},
    expected: refused("check", "types-do-not-meet", ["number", "text"]),
  },
  {
    name: "a type fault on a side the short circuit never reaches is still refused",
    group: "refused-types-do-not-meet",
    from: L.typesMeet,
    claim: C.typesMeet,
    formula: "false && 1",
    shape: NOTHING,
    values: {},
    expected: refused("check", "types-do-not-meet", ["number"]),
    // Running this would never reach the `1`. Checking is not running, and
    // `language-failure.domain.md:27` puts the check before the doing.
  },
  {
    name: "a type fault on a fallback's unreached side is still refused",
    group: "refused-types-do-not-meet",
    from: L.typesMeet,
    claim: C.typesMeet,
    formula: '{count} ?? "none"',
    shape: MIXED,
    values: { count: num(1) },
    expected: refused("check", "types-do-not-meet", ["number", "text"]),
    // `{count}` is there, so running this would answer from the left alone
    // and never reach the text. It is refused before it is ever run.
  },
  {
    name: "a fallback between a boolean and a number is refused",
    group: "refused-types-do-not-meet",
    from: L.typesMeet,
    claim: C.typesMeet,
    formula: "{flag} ?? 0",
    shape: MIXED,
    values: {},
    expected: refused("check", "types-do-not-meet", ["boolean", "number"]),
  },
  {
    name: "a fallback between two lists of different kinds is refused",
    group: "refused-types-do-not-meet",
    from: L.typesMeet,
    claim: C.typesMeet,
    formula: "{tags} ?? {scores}",
    shape: MIXED,
    values: {},
    expected: refused("check", "types-do-not-meet", ["text", "number"]),
  },
  {
    name: "an instant read by an operator rather than a function is refused",
    group: "refused-types-do-not-meet",
    from: L.valueInstant,
    claim: C.valueInstant,
    formula: "{start} < {finish}",
    shape: MIXED,
    values: {},
    expected: refused("check", "instant-read-outside-a-function", ["instant"]),
    // "an instant [...] which only a function taking one may read". An
    // operator is not a function.
  },
  {
    name: "an instant added to a number is refused",
    group: "refused-types-do-not-meet",
    from: L.valueInstant,
    claim: C.valueInstant,
    formula: "{start} + 1",
    shape: MIXED,
    values: {},
    expected: refused("check", "types-do-not-meet", ["start", "instant"]),
  },
  {
    name: "an instant compared for equality by an operator is refused",
    group: "refused-types-do-not-meet",
    from: L.valueInstant,
    claim: C.valueInstant,
    formula: "{start} == {finish}",
    shape: MIXED,
    values: {},
    expected: refused("check", "instant-read-outside-a-function", ["instant"]),
  },
  {
    name: "an instant written into a text literal is refused",
    group: "refused-types-do-not-meet",
    from: L.valueInstant,
    claim: C.valueInstant,
    formula: '"at {start}"',
    shape: MIXED,
    values: {},
    expected: refused("check", "instant-read-outside-a-function", ["start"]),
  },
  {
    name: "comparing a number against a text is refused",
    group: "refused-types-do-not-meet",
    from: L.typesMeet,
    claim: C.typesMeet,
    formula: '{count} == "1"',
    shape: MIXED,
    values: { count: num(1) },
    expected: refused("check", "types-do-not-meet", ["number", "text"]),
    // `==` reaches across absence and nothing else; two kinds that could never
    // be the same are a fault the check can name.
  },
  {
    name: "comparing a number against a boolean is refused",
    group: "refused-types-do-not-meet",
    from: L.typesMeet,
    claim: C.typesMeet,
    formula: "{count} != {flag}",
    shape: MIXED,
    values: {},
    expected: refused("check", "types-do-not-meet", ["number", "boolean"]),
  },
  {
    name: "a computed key whose own formula's types do not meet is refused",
    group: "refused-types-do-not-meet",
    from: L.typesMeet,
    claim: C.typesMeet,
    formula: "{broken}",
    shape: {
      name: { type: TEXT },
      broken: { type: NUMBER, formula: "{name} + 1" },
    },
    values: { name: text("astra") },
    expected: refused("check", "types-do-not-meet", ["name", "text"]),
  },
  {
    name: "a computed key answering a kind other than the type it declares is refused",
    group: "refused-types-do-not-meet",
    from: L.typesMeet,
    claim: C.typesMeet,
    formula: "{mislabelled}",
    shape: {
      count: { type: NUMBER },
      mislabelled: { type: TEXT, formula: "{count} + 1" },
    },
    values: { count: num(1) },
    expected: refused("check", "types-do-not-meet", ["mislabelled", "text", "number"]),
  },
]

// ---------------------------------------------------------------------------
// Refused for a cycle among a page type's formulas
// ---------------------------------------------------------------------------

const refusedCycle: FormulaCase[] = [
  {
    name: "a formula naming itself is a cycle",
    group: "refused-cycle",
    from: L.cycle,
    claim: C.cycle,
    formula: "{loop}",
    shape: {
      loop: { type: NUMBER, formula: "{loop} + 1" },
    },
    values: {},
    expected: refused("check", "formula-cycle", ["loop"]),
  },
  {
    name: "two formulas naming each other are a cycle",
    group: "refused-cycle",
    from: L.cycle,
    claim: C.cycle,
    formula: "{first}",
    shape: {
      first: { type: NUMBER, formula: "{second} + 1" },
      second: { type: NUMBER, formula: "{first} + 1" },
    },
    values: {},
    expected: refused("check", "formula-cycle", ["first", "second"]),
  },
  {
    name: "three formulas round a ring are a cycle",
    group: "refused-cycle",
    from: L.cycle,
    claim: C.cycle,
    formula: "{a}",
    shape: {
      a: { type: NUMBER, formula: "{b} + 1" },
      b: { type: NUMBER, formula: "{c} + 1" },
      c: { type: NUMBER, formula: "{a} + 1" },
    },
    values: {},
    expected: refused("check", "formula-cycle", ["a", "b", "c"]),
  },
  {
    name: "a cycle the formula under check does not reach is still refused",
    group: "refused-cycle",
    from: L.cycle,
    claim: C.cycle,
    formula: "{count} + 1",
    shape: {
      count: { type: NUMBER },
      first: { type: NUMBER, formula: "{second} + 1" },
      second: { type: NUMBER, formula: "{first} + 1" },
    },
    values: { count: num(1) },
    expected: refused("check", "formula-cycle", ["first", "second"]),
    // The cycle is refused when the page type is checked, not when a formula
    // that happens to touch it is run.
  },
  {
    name: "a cycle reached through a text literal is refused",
    group: "refused-cycle",
    from: L.cycle,
    claim: C.cycle,
    formula: "{label}",
    shape: {
      label: { type: TEXT, formula: '"{other} label"' },
      other: { type: TEXT, formula: '"{label} other"' },
    },
    values: {},
    expected: refused("check", "formula-cycle", ["label", "other"]),
  },
  {
    name: "a diamond among formulas is not a cycle",
    group: "refused-cycle",
    from: L.cycle,
    claim: C.cycle,
    formula: "{total}",
    shape: {
      count: { type: NUMBER },
      left: { type: NUMBER, formula: "{count} * 2" },
      right: { type: NUMBER, formula: "{count} * 3" },
      total: { type: NUMBER, formula: "{left} + {right}" },
    },
    values: { count: num(2) },
    expected: answersNumber(10),
    // Two paths reaching one key is a diamond, not a ring.
  },
]

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
  ...caseForm_,
  ...functions,
  ...absence,
  ...neverFails,
  ...refusedAtRead,
  ...refusedUndeclaredKey,
  ...refusedTypes,
  ...refusedCycle,
]
