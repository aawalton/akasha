import type { Operator, TextPart } from "./tree.ts"

const digit = /[0-9]/
const letter = /[A-Za-z]/
const wordCharacter = /[A-Za-z0-9]/
const keyCharacter = /[A-Za-z0-9_-]/

const twoCharacterOperators: ReadonlySet<string> = new Set(["??", "&&", "==", "!=", "<=", ">="])

const oneCharacterOperators: ReadonlySet<string> = new Set(["<", ">", "+", "-", "*", "/"])

export class ReadingRefused extends Error {
  readonly at: number

  constructor(at: number, why: string) {
    super(why)
    this.at = at
  }
}

export type Mark = "(" | ")" | "," | "->"

export type Token =
  | { readonly kind: "number"; readonly at: number; readonly number: number }
  | { readonly kind: "text"; readonly at: number; readonly parts: readonly TextPart[] }
  | { readonly kind: "reference"; readonly at: number; readonly key: string }
  | { readonly kind: "word"; readonly at: number; readonly word: string }
  | { readonly kind: "operator"; readonly at: number; readonly operator: Operator }
  | { readonly kind: "mark"; readonly at: number; readonly mark: Mark }
  | { readonly kind: "end"; readonly at: number }

export const isMark = (token: Token, mark: Mark): boolean => token.kind === "mark" && token.mark === mark

export const isWord = (token: Token, word: string): boolean => token.kind === "word" && token.word === word

export const spelling = (token: Token): string => {
  if (token.kind === "number") return String(token.number)
  if (token.kind === "text") return "a text literal"
  if (token.kind === "reference") return `{${token.key}}`
  if (token.kind === "word") return token.word
  if (token.kind === "operator") return token.operator
  return token.kind === "mark" ? token.mark : "the end of the formula"
}

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

export const tokensIn = (source: string): Token[] => {
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
