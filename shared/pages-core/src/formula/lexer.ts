export class FormulaParseError extends Error {
  constructor(message: string) {
    super(message)
    this.name = "FormulaParseError"
  }
}

export const TokenType = {
  NUMBER: "NUMBER",
  STRING: "STRING",
  PROP_REF: "PROP_REF",
  IDENTIFIER: "IDENTIFIER",
  DOT: "DOT",
  COMMA: "COMMA",
  PLUS: "PLUS",
  MINUS: "MINUS",
  STAR: "STAR",
  SLASH: "SLASH",
  PERCENT: "PERCENT",
  EQ: "EQ",
  NEQ: "NEQ",
  LT: "LT",
  GT: "GT",
  LTE: "LTE",
  GTE: "GTE",
  AND: "AND",
  OR: "OR",
  NOT: "NOT",
  LPAREN: "LPAREN",
  RPAREN: "RPAREN",
  LBRACKET: "LBRACKET",
  RBRACKET: "RBRACKET",
  EOF: "EOF",
} as const
export type TokenType = (typeof TokenType)[keyof typeof TokenType]

export interface Token {
  type: TokenType
  value: string
}

export function tokenize(input: string): readonly Token[] {
  const tokens: Token[] = []
  let i = 0

  while (i < input.length) {
    const ch = input[i] ?? ""
    if (/\s/.test(ch)) {
      i++
      continue
    }

    if (/\d/.test(ch)) {
      const start = i
      let num = ""
      let dotCount = 0
      while (i < input.length) {
        const c = input[i] ?? ""
        if (!/[\d.]/.test(c)) break
        if (c === ".") dotCount++
        num += c
        i++
      }
      if (dotCount > 1) {
        throw new FormulaParseError(`Malformed number literal '${num}' at position ${start}`)
      }
      tokens.push({ type: TokenType.NUMBER, value: num })
      continue
    }

    if (ch === '"' || ch === "'") {
      const quote = ch
      i++
      let str = ""
      while (i < input.length && input[i] !== quote) {
        str += input[i] ?? ""
        i++
      }
      if (i >= input.length) {
        throw new FormulaParseError(`Unterminated string literal at position ${i}`)
      }
      i++
      tokens.push({ type: TokenType.STRING, value: str })
      continue
    }

    if (input.slice(i, i + 5) === "prop(") {
      i += 5
      let id = ""
      while (i < input.length && input[i] !== ")") {
        id += input[i] ?? ""
        i++
      }
      if (i >= input.length) {
        throw new FormulaParseError(`Unterminated prop() reference at position ${i}`)
      }
      i++
      tokens.push({ type: TokenType.PROP_REF, value: id.trim() })
      continue
    }

    if (/[a-zA-Z_]/.test(ch)) {
      let name = ""
      while (i < input.length) {
        const c = input[i] ?? ""
        if (!/[a-zA-Z0-9_]/.test(c)) break
        name += c
        i++
      }
      tokens.push({ type: TokenType.IDENTIFIER, value: name })
      continue
    }

    const two = input.slice(i, i + 2)
    if (two === "==") {
      tokens.push({ type: TokenType.EQ, value: "==" })
      i += 2
      continue
    }
    if (two === "!=") {
      tokens.push({ type: TokenType.NEQ, value: "!=" })
      i += 2
      continue
    }
    if (two === "<=") {
      tokens.push({ type: TokenType.LTE, value: "<=" })
      i += 2
      continue
    }
    if (two === ">=") {
      tokens.push({ type: TokenType.GTE, value: ">=" })
      i += 2
      continue
    }
    if (two === "&&") {
      tokens.push({ type: TokenType.AND, value: "&&" })
      i += 2
      continue
    }
    if (two === "||") {
      tokens.push({ type: TokenType.OR, value: "||" })
      i += 2
      continue
    }

    switch (ch) {
      case "+":
        tokens.push({ type: TokenType.PLUS, value: "+" })
        i++
        continue
      case "-":
        tokens.push({ type: TokenType.MINUS, value: "-" })
        i++
        continue
      case "*":
        tokens.push({ type: TokenType.STAR, value: "*" })
        i++
        continue
      case "/":
        tokens.push({ type: TokenType.SLASH, value: "/" })
        i++
        continue
      case "%":
        tokens.push({ type: TokenType.PERCENT, value: "%" })
        i++
        continue
      case "<":
        tokens.push({ type: TokenType.LT, value: "<" })
        i++
        continue
      case ">":
        tokens.push({ type: TokenType.GT, value: ">" })
        i++
        continue
      case "!":
        tokens.push({ type: TokenType.NOT, value: "!" })
        i++
        continue
      case ".":
        tokens.push({ type: TokenType.DOT, value: "." })
        i++
        continue
      case "(":
        tokens.push({ type: TokenType.LPAREN, value: "(" })
        i++
        continue
      case ")":
        tokens.push({ type: TokenType.RPAREN, value: ")" })
        i++
        continue
      case "[":
        tokens.push({ type: TokenType.LBRACKET, value: "[" })
        i++
        continue
      case "]":
        tokens.push({ type: TokenType.RBRACKET, value: "]" })
        i++
        continue
      case ",":
        tokens.push({ type: TokenType.COMMA, value: "," })
        i++
        continue
      default:
        throw new FormulaParseError(`Unexpected character '${ch}' at position ${i}`)
    }
  }

  tokens.push({ type: TokenType.EOF, value: "" })
  return tokens
}
