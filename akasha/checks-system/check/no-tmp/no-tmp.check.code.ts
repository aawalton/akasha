import ts from "typescript"
import { judgingEachFile, overEachText } from "../../checking/checking.module.code.ts"

const OS = new Set(["node:os", "os"])

const TMPDIR = "tmpdir"

const IN_TMP = /^\/tmp(\/|$)/

function lineAt(source: ts.SourceFile, node: ts.Node): number {
  return source.getLineAndCharacterOfPosition(node.getStart(source)).line + 1
}

function specifierOf(node: ts.ImportDeclaration): string | null {
  const held = node.moduleSpecifier
  return ts.isStringLiteral(held) ? held.text : null
}

function literalIn(node: ts.Node): string | null {
  if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) return node.text
  if (ts.isTemplateHead(node)) return node.text
  return null
}

function takenIn(source: ts.SourceFile, said: string[]): ReadonlySet<string> {
  const bound = new Set<string>()
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
        `line ${lineAt(source, element)} takes \`${TMPDIR}\` from \`${named}\`, and here that answers /tmp`
      )
    }
  }
  return bound
}

function reached(node: ts.Node, bound: ReadonlySet<string>): string | null {
  if (!ts.isPropertyAccessExpression(node)) return null
  if (node.name.text !== TMPDIR) return null
  if (!ts.isIdentifier(node.expression)) return null
  return bound.has(node.expression.text) ? node.expression.text : null
}

export function reasonsFor(at: string, text: string): readonly string[] {
  const source = ts.createSourceFile(at, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS)
  const said: string[] = []
  const bound = takenIn(source, said)
  const walk = (node: ts.Node): undefined => {
    const value = literalIn(node)
    if (value !== null && IN_TMP.test(value)) {
      said.push(
        `line ${lineAt(source, node)} spells a path in /tmp, where no scratch of ours stands`
      )
    }
    const named = reached(node, bound)
    if (named !== null) {
      said.push(
        `line ${lineAt(source, node)} reaches \`${named}.${TMPDIR}\`, and here that answers /tmp`
      )
    }
    ts.forEachChild(node, walk)
  }
  ts.forEachChild(source, walk)
  return said
}

function found(path: string, text: string): readonly string[] {
  return reasonsFor(path, text)
}

export const reasonsIn = overEachText(found)

export const noTmp = judgingEachFile(reasonsIn)
