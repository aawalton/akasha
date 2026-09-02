import { lineOf, parsedAs } from "@akasha/code-system/code-source"
import ts from "typescript"
import {
  judgingEach,
  overEachText,
  TEXTS,
} from "../../../modules/change-walking/change-walking.module.code.ts"

const ERROR = "Error"

const COMPONENT = "Component"

const REACT_COMPONENT = "React.Component"

const DERIVED = "getDerivedStateFromError"

const UNNAMED = "an unnamed class"

type Found = {
  readonly named: string
  readonly line: number
  readonly expression: boolean
  readonly extending: string | null
  readonly deriving: boolean
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

function declaredStatic(node: ts.MethodDeclaration | ts.PropertyDeclaration): boolean {
  const held: readonly ts.ModifierLike[] = node.modifiers ?? []
  return held.some((one) => one.kind === ts.SyntaxKind.StaticKeyword)
}

function derivingState(node: ts.ClassLikeDeclaration): boolean {
  for (const member of node.members) {
    if (!ts.isMethodDeclaration(member) && !ts.isPropertyDeclaration(member)) continue
    if (!ts.isIdentifier(member.name) || member.name.text !== DERIVED) continue
    if (declaredStatic(member)) return true
  }
  return false
}

function extendsComponent(extending: string | null): boolean {
  return extending === COMPONENT || extending === REACT_COMPONENT
}

export function classesIn(at: string, text: string): readonly Found[] {
  const source = parsedAs(at, text)
  const found: Found[] = []
  const held = (node: ts.Node): undefined => {
    if (ts.isClassDeclaration(node) || ts.isClassExpression(node)) {
      found.push({
        named: node.name?.text ?? UNNAMED,
        line: lineOf(source, node),
        expression: ts.isClassExpression(node),
        extending: extendedBy(node),
        deriving: derivingState(node),
      })
    }
    ts.forEachChild(node, held)
  }
  ts.forEachChild(source, held)
  return found
}

function permitted(one: Found): boolean {
  if (one.expression) return false
  if (one.extending === ERROR) return true
  return extendsComponent(one.extending) && one.deriving
}

function reasonFor(one: Found): string {
  if (one.expression)
    return `line ${one.line} is a class expression, and a class expression is a class`
  if (one.extending === null) return `line ${one.line} declares \`class ${one.named}\``
  const said = `line ${one.line} declares \`class ${one.named}\`, which extends \`${one.extending}\``
  if (!extendsComponent(one.extending)) return said
  return `${said} and declares no \`static ${DERIVED}\`, so it is no error boundary`
}

function found(path: string, text: string): readonly string[] {
  return classesIn(path, text)
    .filter((one) => !permitted(one))
    .map(reasonFor)
}

export const reasonsIn = overEachText(found)

export const noClass = judgingEach(TEXTS, (given) => found(given.path, given.text))
