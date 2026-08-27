/**
 * The first moment: reading a formula's text into a tree.
 *
 * Reading knows nothing of what a key holds, so it refuses only what is not
 * written in the language at all. What a formula names is left to checking.
 *
 * Each form the spec leaves unspelled is read by one function, so a ruling
 * re-spells it in one edit: `takeCase`, `takeGrouping`, `takeCall`, `takeNumber`.
 */

import type { Refused } from "./formula.ts"
import { refuse } from "./refused.ts"
import type { CaseRow, Expression, Operator, TextPart } from "./tree.ts"

const digit = /[0-9]/
const letter = /[A-Za-z]/
const wordCharacter = /[A-Za-z0-9]/
const keyCharacter = /[A-Za-z0-9_-]/

const twoCharacterOperators: ReadonlySet<string> = new Set(["??", "&&", "==", "!=", "<=", ">="])

const oneCharacterOperators: ReadonlySet<string> = new Set(["<", ">", "+", "-", "*", "/"])

const comparisons: ReadonlySet<Operator> = new Set<Operator>(["==", "!=", "<", "<=", ">", ">="])

const coalescing: ReadonlySet<Operator> = new Set<Operator>(["??"])
const conjoining: ReadonlySet<Operator> = new Set<Operator>(["&&"])
const adding: ReadonlySet<Operator> = new Set<Operator>(["+", "-"])
const multiplying: ReadonlySet<Operator> = new Set<Operator>(["*", "/"])

/** A refusal on its way out of reading, carrying where it happened. */
class ReadingRefused extends Error {
  readonly at: number

  constructor(at: number, why: string) {
    super(why)
    this.at = at
  }
}

type Mark = "(" | ")" | "," | "->"

type Token =
  | { readonly kind: "number"; readonly at: number; readonly number: number }
  | { readonly kind: "text"; readonly at: number; readonly parts: readonly TextPart[] }
  | { readonly kind: "reference"; readonly at: number; readonly key: string }
  | { readonly kind: "word"; readonly at: number; readonly word: string }
  | { readonly kind: "operator"; readonly at: number; readonly operator: Operator }
  | { readonly kind: "mark"; readonly at: number; readonly mark: Mark }
  | { readonly kind: "end"; readonly at: number }

const isMark = (token: Token, mark: Mark): boolean => token.kind === "mark" && token.mark === mark

const isWord = (token: Token, word: string): boolean => token.kind === "word" && token.word === word

/** How a token is spelled back. */
const spelling = (token: Token): string => {
  if (token.kind === "number") return String(token.number)
  if (token.kind === "text") return "a text literal"
  if (token.kind === "reference") return `{${token.key}}`
  if (token.kind === "word") return token.word
  if (token.kind === "operator") return token.operator
  return token.kind === "mark" ? token.mark : "the end of the formula"
}

/** What to say about a character the language has no use for. */
const adviceAbout = (character: string): string => {
  const advice: Readonly<Record<string, string>> = {
    "=": "a single `=` compares nothing; write `==` to ask whether two values are the same",
    "!": "there is no `!`; write `== false` to ask whether something is false",
    "|": "there is no `||`; a formula chooses between values with a case",
    "&": "a single `&` joins nothing; write `&&`",
    "?": "a single `?` is no operator; write `??` to fall back where a value is absent",
    "'": "a text literal is written between double quotes",
    "}": "a `}` closes a property key, and no key is open here",
    ".": "a number is written with a digit before its point",
    "[": "a case's rows are written between `(` and `)`",
    ":": "a case row is written `test -> value`",
  }
  return advice[character] ?? `\`${character}\` is no part of the formula language`
}

/**
 * A reference: a property key between braces. The spec spells the braces, not
 * the key, which is read here as letters, digits, underscores and hyphens, with
 * no space inside the braces.
 */
const takeReference = (source: string, open: number): { key: string; after: number } => {
  let at = open + 1
  let key = ""
  while (at < source.length && keyCharacter.test(source[at] as string)) {
    key += source[at]
    at += 1
  }
  if (source[at] !== "}") {
    throw new ReadingRefused(open, "a property key is opened with `{` and never closed with `}`")
  }
  if (key === "") throw new ReadingRefused(open, "a property key is empty between its braces")
  return { key, after: at + 1 }
}

/** A text literal, holding no quote of its own, with every reference in it filled where it stands. */
const takeText = (source: string, open: number): { parts: TextPart[]; after: number } => {
  const parts: TextPart[] = []
  let characters = ""
  let at = open + 1
  for (;;) {
    if (at >= source.length) {
      throw new ReadingRefused(open, "a text literal is opened with a quote and never closed")
    }
    const character = source[at] as string
    if (character === '"') {
      if (characters !== "") parts.push({ part: "characters", characters })
      return { parts, after: at + 1 }
    }
    if (character === "{") {
      if (characters !== "") {
        parts.push({ part: "characters", characters })
        characters = ""
      }
      const reference = takeReference(source, at)
      parts.push({ part: "reference", key: reference.key, at })
      at = reference.after
      continue
    }
    characters += character
    at += 1
  }
}

/**
 * A number literal: digits, and at most one point with digits on both sides.
 * There is no sign and no exponent, `-` being subtraction alone, so a negative
 * number is written `0 - 5`.
 */
const takeNumber = (source: string, start: number): { number: number; after: number } => {
  let at = start
  while (at < source.length && digit.test(source[at] as string)) at += 1
  if (source[at] === ".") {
    const afterPoint = at + 1
    let fraction = afterPoint
    while (fraction < source.length && digit.test(source[fraction] as string)) fraction += 1
    if (fraction === afterPoint) {
      throw new ReadingRefused(at, "a number is written with a digit after its point")
    }
    at = fraction
  }
  return { number: Number(source.slice(start, at)), after: at }
}

/** Every token in a formula's text, ending with an end token. */
const tokensIn = (source: string): Token[] => {
  const tokens: Token[] = []
  let at = 0
  while (at < source.length) {
    const character = source[at] as string
    if (character === " " || character === "\t" || character === "\n" || character === "\r") {
      at += 1
      continue
    }
    if (character === '"') {
      const text = takeText(source, at)
      tokens.push({ kind: "text", at, parts: text.parts })
      at = text.after
      continue
    }
    if (character === "{") {
      const reference = takeReference(source, at)
      tokens.push({ kind: "reference", at, key: reference.key })
      at = reference.after
      continue
    }
    if (digit.test(character)) {
      const number = takeNumber(source, at)
      tokens.push({ kind: "number", at, number: number.number })
      at = number.after
      continue
    }
    if (letter.test(character)) {
      let end = at
      while (end < source.length && wordCharacter.test(source[end] as string)) end += 1
      tokens.push({ kind: "word", at, word: source.slice(at, end) })
      at = end
      continue
    }
    if (source.slice(at, at + 2) === "->") {
      tokens.push({ kind: "mark", at, mark: "->" })
      at += 2
      continue
    }
    const pair = source.slice(at, at + 2)
    if (twoCharacterOperators.has(pair)) {
      tokens.push({ kind: "operator", at, operator: pair as Operator })
      at += 2
      continue
    }
    if (oneCharacterOperators.has(character)) {
      tokens.push({ kind: "operator", at, operator: character as Operator })
      at += 1
      continue
    }
    if (character === "(" || character === ")" || character === ",") {
      tokens.push({ kind: "mark", at, mark: character })
      at += 1
      continue
    }
    throw new ReadingRefused(at, adviceAbout(character))
  }
  tokens.push({ kind: "end", at: source.length })
  return tokens
}

type Reader = { readonly tokens: readonly Token[]; index: number }

const here = (reader: Reader): Token => reader.tokens[reader.index] as Token

const step = (reader: Reader): Token => {
  const token = here(reader)
  reader.index += 1
  return token
}

const expectMark = (reader: Reader, mark: Mark, why: string): void => {
  if (!isMark(here(reader), mark)) throw new ReadingRefused(here(reader).at, why)
  step(reader)
}

const operationOf = (
  operator: Operator,
  left: Expression,
  right: Expression,
  at: number
): Expression => ({ node: "operation", operator, left, right, at })

/** One rung of the precedence ladder: an operator joining tighter rungs from the left. */
const takeRung = (
  reader: Reader,
  operators: ReadonlySet<Operator>,
  tighter: (reader: Reader) => Expression
): Expression => {
  let left = tighter(reader)
  for (;;) {
    const token = here(reader)
    if (token.kind !== "operator" || !operators.has(token.operator)) return left
    step(reader)
    left = operationOf(token.operator, left, tighter(reader), token.at)
  }
}

/** A comparison, which cannot follow another comparison. */
const takeComparison = (reader: Reader): Expression => {
  const left = takeSum(reader)
  const token = here(reader)
  if (token.kind !== "operator" || !comparisons.has(token.operator)) return left
  step(reader)
  const right = takeSum(reader)
  const next = here(reader)
  if (next.kind === "operator" && comparisons.has(next.operator)) {
    throw new ReadingRefused(
      next.at,
      "a comparison cannot follow a comparison; join two comparisons with `&&`"
    )
  }
  return operationOf(token.operator, left, right, token.at)
}

const takeProduct = (reader: Reader): Expression => takeRung(reader, multiplying, takeValue)

const takeSum = (reader: Reader): Expression => takeRung(reader, adding, takeProduct)

const takeConjunction = (reader: Reader): Expression => takeRung(reader, conjoining, takeComparison)

const takeCoalesce = (reader: Reader): Expression => takeRung(reader, coalescing, takeConjunction)

/** Grouping: an expression between `(` and `)`. The `(` has been taken. */
const takeGrouping = (reader: Reader): Expression => {
  const inner = takeExpression(reader)
  expectMark(reader, ")", "a `(` is opened and never closed")
  return inner
}

/**
 * A call: a name, then arguments between `(` and `)` separated by `,`. The name
 * has been taken and the `(` is next.
 */
const takeCall = (reader: Reader, name: string, at: number): Expression => {
  step(reader)
  const argumentsGiven: Expression[] = []
  if (!isMark(here(reader), ")")) {
    for (;;) {
      argumentsGiven.push(takeExpression(reader))
      if (!isMark(here(reader), ",")) break
      step(reader)
    }
  }
  expectMark(reader, ")", `the arguments of \`${name}\` are never closed with \`)\``)
  return { node: "call", name, arguments: argumentsGiven, at }
}

/**
 * A case: the word `case`, then rows between `(` and `)` separated by `,`. A
 * row is a test, `->`, and the value answered where that test answers true. The
 * last row's test is the bare word `otherwise`, and it is required.
 *
 * `case(` is spelled exactly like a call and is not one, so `case` is read as a
 * keyword before a word followed by `(` is read as a call.
 */
const takeCase = (reader: Reader, at: number): Expression => {
  expectMark(reader, "(", "a case's rows are written between `(` and `)`")
  const rows: CaseRow[] = []
  let otherwise: Expression | null = null
  for (;;) {
    if (isWord(here(reader), "otherwise")) {
      step(reader)
      expectMark(reader, "->", "an `otherwise` row is written `otherwise -> value`")
      otherwise = takeExpression(reader)
      break
    }
    const test = takeExpression(reader)
    expectMark(reader, "->", "a case row is written `test -> value`")
    rows.push({ test, value: takeExpression(reader) })
    if (!isMark(here(reader), ",")) {
      throw new ReadingRefused(here(reader).at, "every case ends with an `otherwise` row")
    }
    step(reader)
  }
  if (isMark(here(reader), ",")) {
    throw new ReadingRefused(here(reader).at, "`otherwise` is a case's last row")
  }
  expectMark(reader, ")", "a case's rows are closed with `)`")
  if (rows.length === 0) {
    throw new ReadingRefused(
      at,
      "a case with only an `otherwise` row chooses nothing; write that value on its own"
    )
  }
  return { node: "case", rows, otherwise, at }
}

/** A word standing for a value, a case, or the name of a call. */
const takeNamed = (reader: Reader, word: string, at: number): Expression => {
  if (word === "true" || word === "false") {
    return { node: "boolean", boolean: word === "true", at }
  }
  if (word === "absent") return { node: "absent", at }
  if (word === "case") return takeCase(reader, at)
  if (word === "otherwise") {
    throw new ReadingRefused(at, "`otherwise` ends a case, and no case is open here")
  }
  if (isMark(here(reader), "(")) return takeCall(reader, word, at)
  throw new ReadingRefused(
    at,
    `\`${word}\` is no value; only \`true\`, \`false\` and \`absent\` are words standing for a value`
  )
}

/** One value, tighter than every operator. */
const takeValue = (reader: Reader): Expression => {
  const token = step(reader)
  switch (token.kind) {
    case "number":
      return { node: "number", number: token.number, at: token.at }
    case "text":
      return { node: "text", parts: token.parts, at: token.at }
    case "reference":
      return { node: "reference", key: token.key, at: token.at }
    case "word":
      return takeNamed(reader, token.word, token.at)
    case "mark":
      if (token.mark !== "(") {
        throw new ReadingRefused(token.at, `a value cannot start with \`${token.mark}\``)
      }
      return takeGrouping(reader)
    case "operator":
      if (token.operator === "-") {
        throw new ReadingRefused(
          token.at,
          "a `-` here has nothing on its left; write `0 - ...` for a negative number"
        )
      }
      throw new ReadingRefused(token.at, `\`${token.operator}\` needs a value on its left`)
    case "end":
      throw new ReadingRefused(token.at, "the formula ends where a value was expected")
  }
}

const takeExpression = (reader: Reader): Expression => takeCoalesce(reader)

/** Read a formula's text into a tree, or refuse it naming what was wrong and where. */
export const readFormula = (source: string): Expression | Refused => {
  try {
    const reader: Reader = { tokens: tokensIn(source), index: 0 }
    if (here(reader).kind === "end") {
      throw new ReadingRefused(0, "a formula has no expression in it")
    }
    const expression = takeExpression(reader)
    const rest = here(reader)
    if (rest.kind !== "end") {
      throw new ReadingRefused(
        rest.at,
        `the formula is complete, and \`${spelling(rest)}\` follows it`
      )
    }
    return expression
  } catch (thrown) {
    if (thrown instanceof ReadingRefused) return refuse("reading", source, thrown.at, thrown.message)
    throw thrown
  }
}
