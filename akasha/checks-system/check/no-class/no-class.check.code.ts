import ts from "typescript"
import { judgingEachFile, overEachText } from "../../checking.module.code.ts"

const ERROR = "Error"

const UNNAMED = "an unnamed class"

type Found = {
  readonly named: string
  readonly line: number
  readonly expression: boolean
  readonly extending: string | null
}

function nameOf(node: ts.Expression): string | null {
  if (ts.isIdentifier(node)) return node.text
  if (ts.isPropertyAccessExpression(node) && ts.isIdentifier(node.name)) {
    const left = nameOf(node.expression)
    return left === null ? null : `${left}.${node.name.text}`
  }
  return null
}

function extendedBy(node: ts.ClassLikeDeclaration): string | null {
  for (const clause of node.heritageClauses ?? []) {
    if (clause.token !== ts.SyntaxKind.ExtendsKeyword) continue
    const first = clause.types[0]
    if (first === undefined) continue
    return nameOf(first.expression)
  }
  return null
}

export function classesIn(at: string, text: string): readonly Found[] {
  const source = ts.createSourceFile(at, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS)
  const found: Found[] = []
  const held = (node: ts.Node): void => {
    if (ts.isClassDeclaration(node) || ts.isClassExpression(node)) {
      found.push({
        named: node.name?.text ?? UNNAMED,
        line: source.getLineAndCharacterOfPosition(node.getStart(source)).line + 1,
        expression: ts.isClassExpression(node),
        extending: extendedBy(node),
      })
    }
    ts.forEachChild(node, held)
  }
  ts.forEachChild(source, held)
  return found
}

function permitted(one: Found): boolean {
  return !one.expression && one.extending === ERROR
}

function reasonFor(one: Found): string {
  if (one.expression)
    return `line ${one.line} is a class expression, and a class expression is a class`
  if (one.extending === null) return `line ${one.line} declares \`class ${one.named}\``
  return `line ${one.line} declares \`class ${one.named}\`, which extends \`${one.extending}\``
}

function found(path: string, text: string): readonly string[] {
  return classesIn(path, text)
    .filter((one) => !permitted(one))
    .map(reasonFor)
}

export const reasonsIn = overEachText(found)

export const noClass = judgingEachFile(reasonsIn)
