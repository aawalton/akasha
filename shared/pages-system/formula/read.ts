import type { Refused } from "./formula.ts"
import { refuse } from "./refused.ts"
import { type Mark, ReadingRefused, isMark, isWord, spelling, type Token, tokensIn } from "./tokens.ts"
import type { CaseRow, Expression, Operator } from "./tree.ts"

const comparisons: ReadonlySet<Operator> = new Set<Operator>(["==", "!=", "<", "<=", ">", ">="])

const valueWords: ReadonlySet<string> = new Set(["true", "false", "absent"])

const coalescing: ReadonlySet<Operator> = new Set<Operator>(["??"])
const conjoining: ReadonlySet<Operator> = new Set<Operator>(["&&"])
const adding: ReadonlySet<Operator> = new Set<Operator>(["+", "-"])
const multiplying: ReadonlySet<Operator> = new Set<Operator>(["*", "/"])

type Reader = { readonly tokens: readonly Token[]; index: number }

const here = (reader: Reader): Token => reader.tokens[reader.index] as Token

const after = (reader: Reader): Token => reader.tokens[reader.index + 1] as Token

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

const takeNegation = (reader: Reader): Expression => {
  const token = here(reader)
  if (token.kind !== "operator" || token.operator !== "-") return takeValue(reader)
  step(reader)
  return { node: "negation", of: takeNegation(reader), at: token.at }
}

const takeProduct = (reader: Reader): Expression => takeRung(reader, multiplying, takeNegation)

const takeSum = (reader: Reader): Expression => takeRung(reader, adding, takeProduct)

const takeConjunction = (reader: Reader): Expression => takeRung(reader, conjoining, takeComparison)

const takeCoalesce = (reader: Reader): Expression => takeRung(reader, coalescing, takeConjunction)

const takeGrouping = (reader: Reader): Expression => {
  const inner = takeExpression(reader)
  expectMark(reader, ")", "a `(` is opened and never closed")
  return inner
}

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
    const word = here(reader)
    if (word.kind === "word" && !valueWords.has(word.word) && isMark(after(reader), "->")) {
      throw new ReadingRefused(
        word.at,
        `\`${word.word}\` is no test; a case's last row is written with the word \`otherwise\``
      )
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
  return { node: "case", rows, otherwise, at }
}

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
      throw new ReadingRefused(token.at, `\`${token.operator}\` needs a value on its left`)
    case "end":
      throw new ReadingRefused(token.at, "the formula ends where a value was expected")
  }
}

const takeExpression = (reader: Reader): Expression => takeCoalesce(reader)

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
    if (thrown instanceof ReadingRefused)
      return refuse("reading", source, thrown.at, thrown.message)
    throw thrown
  }
}
