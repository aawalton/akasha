import ts from "typescript"
import { lineOf, parsedAs } from "../../../code-system/code-source/code-source.module.code.ts"
import { judgingEachFile, overEachText } from "../../checking/checking.module.code.ts"

const KIND = "invariantKind"

const STATEMENT = "statement"

const WHY = /\b(because|since)\b|([,;])/

const TRAILING = /[\s,;]+$/

const LEADING = /^[\s,;]+/

export type Stated = {
  readonly line: number
  readonly text: string
}

export type Split = {
  readonly line: number
  readonly drawn: boolean
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
  const held = WHY.exec(one.text)
  if (held === null) return null
  return {
    line: one.line,
    drawn: held[2] !== undefined,
    mark: held[0],
    first: one.text.slice(0, held.index).replace(TRAILING, ""),
    second: one.text.slice(held.index).replace(LEADING, ""),
  }
}

function sayingOf(split: Split): string {
  if (split.drawn) {
    return (
      `line ${split.line} joins a second fact at \`${split.mark}\` — an invariant states one thing\n` +
      `  ${split.second}\n` +
      "  cut what only explains or follows from the first. Split out what does not."
    )
  }
  return (
    `line ${split.line} states why at \`${split.mark}\` — an invariant states what is true, never why\n` +
    `  ${split.second}\n` +
    "  cut what only explains. Split out a fact standing in there and keep it."
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
