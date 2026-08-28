import type {
  Citation,
  FormulaType,
  FormulaValue,
  Outcome,
  RefusalMoment,
  RefusalReason,
  Shape,
} from "./cases.ts"

export function caseForm(rows: Array<{ test: string; value: string }>, otherwise: string): string {
  const written = [...rows, { test: "otherwise", value: otherwise }]
    .map((row) => `${row.test} -> ${row.value}`)
    .join(", ")
  return `case(${written})`
}

export function caseFormWithoutOtherwise(rows: Array<{ test: string; value: string }>): string {
  const written = rows.map((row) => `${row.test} -> ${row.value}`).join(", ")
  return `case(${written})`
}

export function call(name: string, ...args: string[]): string {
  return `${name}(${args.join(", ")})`
}

export const TEXT: FormulaType = { kind: "text" }
export const NUMBER: FormulaType = { kind: "number" }
export const BOOLEAN: FormulaType = { kind: "boolean" }
export const INSTANT: FormulaType = { kind: "instant" }
export const CALENDAR_DATE: FormulaType = { kind: "calendar-date" }
export const listOf = (of: FormulaType): FormulaType => ({ kind: "list", of })

export const text = (value: string): FormulaValue => ({ kind: "text", text: value })
export const num = (value: number): FormulaValue => ({ kind: "number", number: value })
export const bool = (value: boolean): FormulaValue => ({ kind: "boolean", boolean: value })
export const instant = (value: string): FormulaValue => ({ kind: "instant", instant: value })
export const date = (value: string): FormulaValue => ({ kind: "date", date: value })
export const listOfValues = (...values: FormulaValue[]): FormulaValue => ({
  kind: "list",
  list: values,
})

export const answers = (value: FormulaValue): Outcome => ({ outcome: "value", value })
export const answersText = (value: string): Outcome => answers(text(value))
export const answersNumber = (value: number): Outcome => answers(num(value))
export const answersBoolean = (value: boolean): Outcome => answers(bool(value))
export const answersDate = (value: string): Outcome => answers(date(value))
export const ABSENT: Outcome = { outcome: "absent" }
export const refused = (
  at: RefusalMoment,
  reason: RefusalReason,
  mustName?: string[]
): Outcome => ({
  outcome: "refused",
  at,
  reason,
  ...(mustName ? { mustName } : {}),
})

export const NOTHING: Shape = {}
export const COUNT: Shape = { count: { type: NUMBER } }
export const NAME: Shape = { name: { type: TEXT } }
export const FLAG: Shape = { flag: { type: BOOLEAN } }
export const MIXED: Shape = {
  count: { type: NUMBER },
  other: { type: NUMBER },
  name: { type: TEXT },
  flag: { type: BOOLEAN },
  tags: { type: listOf(TEXT) },
  scores: { type: listOf(NUMBER) },
  start: { type: INSTANT },
  finish: { type: INSTANT },
}

export const FORMULA_LANGUAGE = "pages/domain/formula-language.domain.md"
export const FORMULA_ABSENT_VALUE = "pages/domain/formula-absent-value.domain.md"
export const FORMULA_VALUES = "pages/list/formula-values.list.md"
export const FORMULA_FUNCTIONS = "pages/list/formula-functions.list.md"
export const FORMULA_OPERATORS = "pages/list/formula-operators.list.md"
export const LANGUAGE_FAILURE = "pages/domain/language-failure.domain.md"
export const LANGUAGE_TYPE_SYSTEM = "pages/domain/language-type-system.domain.md"
export const LANGUAGE_POWER = "pages/domain/language-power.domain.md"

export const onLine = (page: string, line: number): Citation => ({ at: "line", page, line })
export const namingNo = (page: string, section: string, ...names: string[]): Citation => ({
  at: "absence",
  page,
  section,
  names,
})

export const L = {
  reference: onLine(FORMULA_LANGUAGE, 26),
  referenceInText: onLine(FORMULA_LANGUAGE, 28),
  dateInText: onLine(FORMULA_LANGUAGE, 30),
  calendarDateProperty: onLine(FORMULA_LANGUAGE, 32),
  chooseWithCase: onLine(FORMULA_LANGUAGE, 34),
  caseSpelling: onLine(FORMULA_LANGUAGE, 36),
  caseRowSpelling: onLine(FORMULA_LANGUAGE, 38),
  everyCaseOtherwise: onLine(FORMULA_LANGUAGE, 40),
  otherwiseSpelling: onLine(FORMULA_LANGUAGE, 42),
  onlyWinningRow: onLine(FORMULA_LANGUAGE, 44),
  callSpelling: onLine(FORMULA_LANGUAGE, 46),
  computedLikeStored: onLine(FORMULA_LANGUAGE, 48),
  noNames: onLine(FORMULA_LANGUAGE, 50),
  cycle: onLine(FORMULA_LANGUAGE, 52),
  joinsText: onLine(FORMULA_LANGUAGE, 54),
  precedence: onLine(FORMULA_LANGUAGE, 56),
  equalBindsLeft: onLine(FORMULA_LANGUAGE, 58),
  parenthesesGroup: onLine(FORMULA_LANGUAGE, 60),
  shortCircuit: onLine(FORMULA_LANGUAGE, 62),
  textLiteral: onLine(FORMULA_LANGUAGE, 64),
  valueWords: onLine(FORMULA_LANGUAGE, 66),
  undeclaredKey: onLine(FORMULA_LANGUAGE, 68),
  typesMeet: onLine(FORMULA_LANGUAGE, 70),
  answersDeclaredType: onLine(FORMULA_LANGUAGE, 72),
  neverFails: onLine(FORMULA_LANGUAGE, 74),

  absentOperator: onLine(FORMULA_ABSENT_VALUE, 15),
  absentEquality: onLine(FORMULA_ABSENT_VALUE, 17),
  rowMatchesOnTrue: onLine(FORMULA_ABSENT_VALUE, 19),
  fallback: onLine(FORMULA_ABSENT_VALUE, 21),
  divideByZero: onLine(FORMULA_ABSENT_VALUE, 23),
  textLiteralAbsent: onLine(FORMULA_ABSENT_VALUE, 25),
  absentFunction: onLine(FORMULA_ABSENT_VALUE, 27),

  valueText: onLine(FORMULA_VALUES, 15),
  valueNumber: onLine(FORMULA_VALUES, 16),
  valueBoolean: onLine(FORMULA_VALUES, 17),
  valueList: onLine(FORMULA_VALUES, 18),
  valueInstant: onLine(FORMULA_VALUES, 19),
  valueDate: onLine(FORMULA_VALUES, 20),
  valueAbsent: onLine(FORMULA_VALUES, 21),

  fnNow: onLine(FORMULA_FUNCTIONS, 15),
  fnHoursBetween: onLine(FORMULA_FUNCTIONS, 16),
  fnContains: onLine(FORMULA_FUNCTIONS, 17),
  fnHasWord: onLine(FORMULA_FUNCTIONS, 18),
  fnText: onLine(FORMULA_FUNCTIONS, 19),

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

  noOrOperator: namingNo(FORMULA_OPERATORS, "List", "||"),
  noNotOperator: namingNo(FORMULA_OPERATORS, "List", "!"),
  noRemainderOperator: namingNo(FORMULA_OPERATORS, "List", "%"),
  noSingleEquals: namingNo(FORMULA_OPERATORS, "List", "="),
  noUpperFunction: namingNo(FORMULA_FUNCTIONS, "List", "upper"),
  noIncludesFunction: namingNo(FORMULA_FUNCTIONS, "List", "includes"),
  noTodayFunction: namingNo(FORMULA_FUNCTIONS, "List", "today"),
} as const

export const C = {
  reference: "A formula names a property by putting its key between braces.",
  referenceInText: "A reference inside a text literal is filled where it stands.",
  dateInText: "A date fills a text literal as it is written.",
  calendarDateProperty: "A property declared `calendar-date` holds a date.",
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
    "A formula's operators bind in this order, loosest first: `??`, `&&`, comparison, addition, multiplication, negation.",
  equalBindsLeft: "Operators that bind equally group to the left.",
  parenthesesGroup: "Parentheses group.",
  shortCircuit: "An operator that can answer from its left side alone does not work out its right.",
  textLiteral: "A text literal is written between double quotes, and holds no quote of its own.",
  valueWords: "Only `true`, `false` and `absent` are words standing for a value.",
  undeclaredKey:
    "A formula that names a key its page type does not declare is refused when the page type is checked.",
  typesMeet: "A formula whose types do not meet is refused when the page type is checked.",
  answersDeclaredType:
    "A formula that answers a kind other than the type its property declares is refused when the page type is checked.",
  neverFails: "A formula that passes its check answers a value or absent, and never fails.",

  absentOperator: "An operator that reaches an absent value answers absent.",
  absentEquality: "`==` and `!=` answer a boolean, absent being equal only to absent.",
  rowMatchesOnTrue: "A case row matches only where its test answers true.",
  fallback: "`??` answers its left side, or its right where its left is absent.",
  divideByZero: "Dividing by zero answers absent.",
  textLiteralAbsent: "A text literal answers absent where any reference in it is absent.",
  absentFunction: "A function that reaches an absent value answers absent.",

  valueText: "**text** — a run of characters.",
  valueNumber: "**number** — a count or a measure, whole or fractional.",
  valueBoolean: "**boolean** — true or false.",
  valueList: "**list** — several values of one kind, in order.",
  valueInstant: "**instant** — a moment in time, which only a function taking one may read.",
  valueDate: "**date** — a day, written `2026-08-27`.",
  valueAbsent:
    "**absent** — what a formula gets where the page holds nothing under the key it read.",

  fnNow: "**now** — the moment the formula is worked out, as an instant.",
  fnHoursBetween: "**hoursBetween** — the hours between two instants, never negative.",
  fnContains: "**contains** — whether a list holds a value.",
  fnHasWord:
    "**hasWord** — whether a text holds a word, bounded at both ends by anything that is not a letter or a digit, ignoring case.",
  fnText: "**text** — a whole number written as its digits, and absent for one that is not whole.",

  opPlus: "**`+`** — adds one number to another.",
  opMinus:
    "**`-`** — subtracts one number from another, or negates one where nothing stands to its left.",
  opTimes: "**`*`** — multiplies one number by another.",
  opDivide: "**`/`** — divides one number by another.",
  opEqual: "**`==`** — whether two values are the same.",
  opNotEqual: "**`!=`** — whether two values differ.",
  opLess: "**`<`** — whether one number is less than another.",
  opAtMost: "**`<=`** — whether one number is at most another.",
  opMore: "**`>`** — whether one number is more than another.",
  opAtLeast: "**`>=`** — whether one number is at least another.",
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
  noTodayFunction: "The functions list names no `today`.",
} as const
