import { assertNever } from "../../../utils-narrow/src/assert-never"
import { requireFirst } from "../../../utils-narrow/src/require-first"
import { formulaFunctions } from "./functions"
import { FormulaParseError, type Token, TokenType, tokenize } from "./lexer"


export type FormulaNode =
  | { readonly type: "number"; readonly value: number }
  | { readonly type: "string"; readonly value: string }
  | { readonly type: "boolean"; readonly value: boolean }
  | { readonly type: "null" }
  | { readonly type: "prop"; readonly id: string }
  | { readonly type: "ref"; readonly path: readonly string[] }
  | {
      readonly type: "binary"
      readonly op: "+" | "-" | "*" | "/" | "%" | "==" | "!=" | "<" | ">" | "<=" | ">=" | "&&" | "||"
      readonly left: FormulaNode
      readonly right: FormulaNode
    }
  | { readonly type: "unary_minus"; readonly operand: FormulaNode }
  | { readonly type: "unary_not"; readonly operand: FormulaNode }
  | { readonly type: "call"; readonly name: string; readonly args: readonly FormulaNode[] }
  | { readonly type: "bracket_access"; readonly obj: FormulaNode; readonly key: FormulaNode }
  | { readonly type: "array"; readonly elements: readonly FormulaNode[] }

interface ParserState {
  readonly tokens: readonly Token[]
  pos: number
}

const last = (s: ParserState): Token => requireFirst(s.tokens.slice(-1))
const peek = (s: ParserState): Token => s.tokens[s.pos] ?? last(s)
const peekAt = (s: ParserState, n: number): Token => s.tokens[s.pos + n] ?? last(s)
function advance(s: ParserState): Token {
  const tok = peek(s)
  s.pos++
  return tok
}

function expect(s: ParserState, type: TokenType): Token {
  const tok = peek(s)
  if (tok.type !== type) {
    throw new FormulaParseError(`Expected ${type} but got ${tok.type} at position ${s.pos}`)
  }
  return advance(s)
}

function parseOr(s: ParserState): FormulaNode {
  let left = parseAnd(s)
  while (peek(s).type === TokenType.OR) {
    advance(s)
    const right = parseAnd(s)
    left = { type: "binary", op: "||", left, right }
  }
  return left
}

function parseAnd(s: ParserState): FormulaNode {
  let left = parseEquality(s)
  while (peek(s).type === TokenType.AND) {
    advance(s)
    const right = parseEquality(s)
    left = { type: "binary", op: "&&", left, right }
  }
  return left
}

function parseEquality(s: ParserState): FormulaNode {
  let left = parseComparison(s)
  while (peek(s).type === TokenType.EQ || peek(s).type === TokenType.NEQ) {
    const tok = advance(s)
    const op = tok.type === TokenType.EQ ? "==" : "!="
    const right = parseComparison(s)
    left = { type: "binary", op, left, right }
  }
  return left
}

function parseComparison(s: ParserState): FormulaNode {
  let left = parseAdditive(s)
  while (
    peek(s).type === TokenType.LT ||
    peek(s).type === TokenType.GT ||
    peek(s).type === TokenType.LTE ||
    peek(s).type === TokenType.GTE
  ) {
    const tok = advance(s)
    const op =
      tok.type === TokenType.LT
        ? "<"
        : tok.type === TokenType.GT
          ? ">"
          : tok.type === TokenType.LTE
            ? "<="
            : ">="
    const right = parseAdditive(s)
    left = { type: "binary", op, left, right }
  }
  return left
}

function parseAdditive(s: ParserState): FormulaNode {
  let left = parseMultiplicative(s)
  while (peek(s).type === TokenType.PLUS || peek(s).type === TokenType.MINUS) {
    const tok = advance(s)
    const op = tok.type === TokenType.PLUS ? "+" : "-"
    const right = parseMultiplicative(s)
    left = { type: "binary", op, left, right }
  }
  return left
}

function parseMultiplicative(s: ParserState): FormulaNode {
  let left = parseUnary(s)
  while (
    peek(s).type === TokenType.STAR ||
    peek(s).type === TokenType.SLASH ||
    peek(s).type === TokenType.PERCENT
  ) {
    const tok = advance(s)
    const op = tok.type === TokenType.STAR ? "*" : tok.type === TokenType.SLASH ? "/" : "%"
    const right = parseUnary(s)
    left = { type: "binary", op, left, right }
  }
  return left
}

function parseUnary(s: ParserState): FormulaNode {
  const tok = peek(s)
  if (tok.type === TokenType.MINUS) {
    advance(s)
    const operand = parseUnary(s)
    return { type: "unary_minus", operand }
  }
  if (tok.type === TokenType.NOT) {
    advance(s)
    const operand = parseUnary(s)
    return { type: "unary_not", operand }
  }
  return parsePostfixAccess(s)
}

function parsePostfixAccess(s: ParserState): FormulaNode {
  let expr = parsePrimary(s)
  while (peek(s).type === TokenType.LBRACKET) {
    advance(s)
    const key = parseExpr(s)
    expect(s, TokenType.RBRACKET)
    expr = { type: "bracket_access", obj: expr, key }
  }
  return expr
}

function parseExpr(s: ParserState): FormulaNode {
  return parseOr(s)
}

function parsePrimary(s: ParserState): FormulaNode {
  const tok = peek(s)

  switch (tok.type) {
    case TokenType.NUMBER: {
      advance(s)
      return { type: "number", value: Number(tok.value) }
    }
    case TokenType.STRING: {
      advance(s)
      return { type: "string", value: tok.value }
    }
    case TokenType.PROP_REF: {
      advance(s)
      return { type: "prop", id: tok.value }
    }
    case TokenType.IDENTIFIER: {
      const next = peekAt(s, 1)
      if (next.type === TokenType.LPAREN) {
        return parseCall(s)
      }
      if (next.type === TokenType.DOT) {
        return parseRef(s)
      }
      if (tok.value === "null") {
        advance(s)
        return { type: "null" }
      }
      if (tok.value === "true" || tok.value === "false") {
        advance(s)
        return { type: "boolean", value: tok.value === "true" }
      }
      advance(s)
      return { type: "ref", path: [tok.value] }
    }
    case TokenType.LPAREN: {
      advance(s)
      const expr = parseExpr(s)
      expect(s, TokenType.RPAREN)
      return expr
    }
    case TokenType.LBRACKET:
      return parseArrayLiteral(s)
    case TokenType.DOT:
    case TokenType.COMMA:
    case TokenType.PLUS:
    case TokenType.MINUS:
    case TokenType.STAR:
    case TokenType.SLASH:
    case TokenType.PERCENT:
    case TokenType.EQ:
    case TokenType.NEQ:
    case TokenType.LT:
    case TokenType.GT:
    case TokenType.LTE:
    case TokenType.GTE:
    case TokenType.AND:
    case TokenType.OR:
    case TokenType.NOT:
    case TokenType.RPAREN:
    case TokenType.RBRACKET:
    case TokenType.EOF:
      throw new FormulaParseError(
        `Unexpected token ${tok.type}${tok.value !== "" ? ` '${tok.value}'` : ""} at position ${s.pos}`
      )
    default:
      assertNever(tok.type)
  }
}

function parseArrayLiteral(s: ParserState): FormulaNode {
  expect(s, TokenType.LBRACKET)
  const elements: FormulaNode[] = []
  if (peek(s).type !== TokenType.RBRACKET) {
    elements.push(parseExpr(s))
    while (peek(s).type === TokenType.COMMA) {
      advance(s)
      elements.push(parseExpr(s))
    }
  }
  expect(s, TokenType.RBRACKET)
  return { type: "array", elements }
}

function parseRef(s: ParserState): FormulaNode {
  const head = expect(s, TokenType.IDENTIFIER)
  const path: string[] = [head.value]
  while (peek(s).type === TokenType.DOT) {
    advance(s)
    const seg = peek(s)
    if (seg.type !== TokenType.IDENTIFIER) {
      throw new FormulaParseError(
        `Expected identifier after '.' at position ${s.pos}, got ${seg.type}`
      )
    }
    advance(s)
    path.push(seg.value)
  }
  return { type: "ref", path }
}

function parseCall(s: ParserState): FormulaNode {
  const nameTok = expect(s, TokenType.IDENTIFIER)
  const name = nameTok.value
  const fn = formulaFunctions.get(name)
  if (!fn) {
    throw new FormulaParseError(`Unknown function '${name}' at position ${s.pos - 1}`)
  }
  expect(s, TokenType.LPAREN)

  const args: FormulaNode[] = []
  if (peek(s).type !== TokenType.RPAREN) {
    args.push(parseExpr(s))
    while (peek(s).type === TokenType.COMMA) {
      advance(s)
      args.push(parseExpr(s))
    }
  }
  expect(s, TokenType.RPAREN)

  if (args.length !== fn.arity) {
    throw new FormulaParseError(
      `Function '${name}' expects ${fn.arity} argument${fn.arity === 1 ? "" : "s"} but got ${args.length}`
    )
  }
  return { type: "call", name, args }
}

function ensureConsumed(s: ParserState): undefined {
  if (peek(s).type !== TokenType.EOF) {
    throw new FormulaParseError(
      `Unexpected token ${peek(s).type} '${peek(s).value}' at position ${s.pos}`
    )
  }
}

export function parseExpression(input: string): FormulaNode {
  if (input.trim() === "") {
    throw new FormulaParseError("Empty expression")
  }
  const tokens = tokenize(input)
  const state: ParserState = { tokens, pos: 0 }
  const ast = parseExpr(state)
  ensureConsumed(state)
  return ast
}
