import { overEachText } from "akasha/checks/modules/change-walking/change-walking.module.code.ts"
import { lineOf, parsedAs } from "akasha/code/modules/source/code-source.module.code.ts"
import ts from "typescript"

const ANSWERING = "answering"

const NONE = 0

type Work = ts.ArrowFunction | ts.FunctionExpression

function namedIn(source: ts.SourceFile): string | null {
  for (const one of source.statements) {
    if (!ts.isImportDeclaration(one)) continue
    const clause = one.importClause
    const bound = clause?.namedBindings
    if (clause === undefined || clause.isTypeOnly || bound === undefined) continue
    if (!ts.isNamedImports(bound)) continue
    for (const held of bound.elements) {
      if (held.isTypeOnly) continue
      if ((held.propertyName?.text ?? held.name.text) === ANSWERING) return held.name.text
    }
  }
  return null
}

function workIn(node: ts.Expression | undefined): Work | null {
  if (node === undefined) return null
  if (ts.isArrowFunction(node) || ts.isFunctionExpression(node)) return node
  return null
}

function handedBy(node: ts.Node, named: string): Work | null {
  if (!ts.isCallExpression(node)) return null
  if (!ts.isIdentifier(node.expression) || node.expression.text !== named) return null
  const work = workIn(node.arguments[NONE])
  return work === null || work.parameters.length > NONE ? null : work
}

export function foundIn(at: string, text: string): readonly string[] {
  if (!text.includes(ANSWERING)) return []
  const source = parsedAs(at, text)
  const named = namedIn(source)
  if (named === null) return []
  const found: string[] = []
  const held = (node: ts.Node): undefined => {
    const work = handedBy(node, named)
    if (work !== null) {
      found.push(
        `line ${lineOf(source, work)} hands \`${named}\` work taking no list, so a throw here ` +
          "says nothing of what that work had already done"
      )
    }
    ts.forEachChild(node, held)
  }
  ts.forEachChild(source, held)
  return found
}

export const reasonsIn = overEachText(foundIn)
