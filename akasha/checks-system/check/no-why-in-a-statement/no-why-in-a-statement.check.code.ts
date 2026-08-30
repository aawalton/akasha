import ts from "typescript"
import { lineOf, parsedAs } from "../../../code-system/code-source/code-source.module.code.ts"
import { judgingEachFile, overEachText } from "../../checking/checking.module.code.ts"

const KIND = "invariantKind"

const STATEMENT = "statement"

const WHY = /\b(because|since)\b/

const JOIN = /[,;:—]/

const TWO = /[a-z`)"]\.\s+[A-Z`]/

const TRAILING = /[\s,;:—]+$/

const LEADING = /^[\s,;:—.]+/

export type Stated = {
  readonly line: number
  readonly text: string
}

export type Shape = "why" | "join" | "two"

export type Split = {
  readonly line: number
  readonly shape: Shape
  readonly mark: string
  readonly first: string
  readonly second: string
}

function joinedIn(node: ts.Expression): string | null {
  if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) return node.text
  if (ts.isParenthesizedExpression(node)) return joinedIn(node.expression)
  if (!ts.isBinaryExpression(node)) return null
  if (node.operatorToken.kind !== ts.SyntaxKind.PlusToken) return null
  const head = joinedIn(node.left)
  const tail = joinedIn(node.right)
  if (head === null || tail === null) return null
  return head + tail
}

function statementIn(node: ts.ObjectLiteralExpression): ts.Expression | null {
  let kinded = false
  let held: ts.Expression | null = null
  for (const one of node.properties) {
    if (!ts.isPropertyAssignment(one)) continue
    const name = one.name
    const said = ts.isIdentifier(name) || ts.isStringLiteral(name) ? name.text : null
    if (said === KIND) kinded = true
    if (said === STATEMENT) held = one.initializer
  }
  return kinded ? held : null
}

export function statementsIn(path: string, text: string): readonly Stated[] {
  const source = parsedAs(path, text)
  const found: Stated[] = []
  const walk = (node: ts.Node): undefined => {
    if (ts.isObjectLiteralExpression(node)) {
      const held = statementIn(node)
      if (held !== null) {
        const said = joinedIn(held)
        if (said !== null) found.push({ line: lineOf(source, held), text: said })
      }
    }
    ts.forEachChild(node, walk)
  }
  ts.forEachChild(source, walk)
  return found
}

export function splitAt(one: Stated): Split | null {
  const why = WHY.exec(one.text)
  const join = JOIN.exec(one.text)
  const two = TWO.exec(one.text)
  const every: readonly (readonly [number, Shape, string])[] = [
    why === null ? null : ([why.index, "why", why[0]] as const),
    join === null ? null : ([join.index, "join", join[0]] as const),
    two === null ? null : ([two.index + 1, "two", "."] as const),
  ].filter((held) => held !== null)
  let best: readonly [number, Shape, string] | null = null
  for (const held of every) if (best === null || held[0] < best[0]) best = held
  if (best === null) return null
  const [at, shape, mark] = best
  return {
    line: one.line,
    shape,
    mark,
    first: one.text.slice(0, at).replace(TRAILING, ""),
    second: one.text.slice(at).replace(LEADING, ""),
  }
}

function sayingOf(split: Split): string {
  if (split.shape === "why") {
    return (
      `line ${split.line} states why at \`${split.mark}\` — an invariant states what is true and never why\n` +
      `  ${split.second}\n` +
      "  cut what only explains. Split out a fact standing in there and keep it."
    )
  }
  const head =
    split.shape === "two"
      ? `line ${split.line} holds two sentences — an invariant states one thing`
      : `line ${split.line} joins a second fact at \`${split.mark}\` — an invariant states one thing`
  return (
    `${head}\n` +
    `  ${split.second}\n` +
    "  cut what only explains or follows from the first. Split out what does not."
  )
}

function found(path: string, text: string): readonly string[] {
  const said: string[] = []
  for (const one of statementsIn(path, text)) {
    const split = splitAt(one)
    if (split !== null) said.push(sayingOf(split))
  }
  return said
}

export const reasonsIn = overEachText(found)

export const noWhyInAStatement = judgingEachFile(reasonsIn)
