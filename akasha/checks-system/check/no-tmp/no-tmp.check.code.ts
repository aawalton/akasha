import ts from "typescript"
import { lineOf, parsedAs } from "../../../code-system/code-source/code-source.module.code.ts"
import { judgingEachFile, overEachText } from "../../checking/checking.module.code.ts"

const OS = new Set(["node:os", "os"])

const TMPDIR = "tmpdir"

const IN_TMP = /^\/tmp(\/|$)/

function specifierOf(node: ts.ImportDeclaration): string | null {
  const held = node.moduleSpecifier
  return ts.isStringLiteral(held) ? held.text : null
}

function literalIn(node: ts.Node): string | null {
  if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) return node.text
  if (ts.isTemplateHead(node)) return node.text
  return null
}

type Taken = {
  readonly bound: ReadonlySet<string>
  readonly said: readonly string[]
}

function takenIn(source: ts.SourceFile): Taken {
  const bound = new Set<string>()
  const said: string[] = []
  for (const one of source.statements) {
    if (!ts.isImportDeclaration(one)) continue
    const named = specifierOf(one)
    if (named === null || !OS.has(named)) continue
    const clause = one.importClause
    if (clause === undefined) continue
    if (clause.name !== undefined) bound.add(clause.name.text)
    const held = clause.namedBindings
    if (held === undefined) continue
    if (ts.isNamespaceImport(held)) {
      bound.add(held.name.text)
      continue
    }
    for (const element of held.elements) {
      if ((element.propertyName ?? element.name).text !== TMPDIR) continue
      said.push(
        `line ${lineOf(source, element)} takes \`${TMPDIR}\` from \`${named}\`, and here that answers /tmp`
      )
    }
  }
  return { bound, said }
}

function reached(node: ts.Node, bound: ReadonlySet<string>): string | null {
  if (!ts.isPropertyAccessExpression(node)) return null
  if (node.name.text !== TMPDIR) return null
  if (!ts.isIdentifier(node.expression)) return null
  return bound.has(node.expression.text) ? node.expression.text : null
}

export function reasonsFor(at: string, text: string): readonly string[] {
  const source = parsedAs(at, text)
  const taken = takenIn(source)
  const said: string[] = []
  const walk = (node: ts.Node): undefined => {
    const value = literalIn(node)
    if (value !== null && IN_TMP.test(value)) {
      said.push(
        `line ${lineOf(source, node)} spells a path in /tmp, where no scratch of ours stands`
      )
    }
    const named = reached(node, taken.bound)
    if (named !== null) {
      said.push(
        `line ${lineOf(source, node)} reaches \`${named}.${TMPDIR}\`, and here that answers /tmp`
      )
    }
    ts.forEachChild(node, walk)
  }
  ts.forEachChild(source, walk)
  return [...taken.said, ...said]
}

function found(path: string, text: string): readonly string[] {
  return reasonsFor(path, text)
}

export const reasonsIn = overEachText(found)

export const noTmp = judgingEachFile(reasonsIn)
