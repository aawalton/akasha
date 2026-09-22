import { dirname } from "node:path"
import type { Paged } from "akasha/check/modules/audit-commit/audit-commit.module.code.ts"
import {
  lineOf,
  parsedAs,
} from "akasha/code/reading/modules/code-source/code-source.module.code.ts"
import { partedIn } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import ts from "typescript"

export const CLASS = "class"

const ERROR = "Error"

const COMPONENT = "Component"

const REACT_COMPONENT = "React.Component"

const DERIVED = "getDerivedStateFromError"

const UNNAMED = "an unnamed class"

const DECLARED = ".d.ts"

const RUNTIME_LIBRARY = "lua-runtime-library"

const LUALIB_HELPER = "lualib-helper"

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
  const seen: Found[] = []
  const held = (node: ts.Node): undefined => {
    if (ts.isClassDeclaration(node) || ts.isClassExpression(node)) {
      seen.push({
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
  return seen
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

function heldByTheRuntimeLibrary(under: readonly string[], path: string): boolean {
  if (partedIn(path)?.pageType === LUALIB_HELPER) return true
  return under.some((one) => path.startsWith(one))
}

export function found(under: readonly string[], path: string, text: string): readonly string[] {
  if (path.endsWith(DECLARED)) return []
  if (heldByTheRuntimeLibrary(under, path)) return []
  if (!text.includes(CLASS)) return []
  return classesIn(path, text)
    .filter((one) => !permitted(one))
    .map(reasonFor)
}

const LIBRARIES = new WeakMap<Paged, readonly string[]>()

export function librariesIn(paged: Paged): readonly string[] {
  const held = LIBRARIES.get(paged)
  if (held !== undefined) return held
  const made = paged.index.everyOfType(RUNTIME_LIBRARY).map((one) => `${dirname(one.path)}/`)
  LIBRARIES.set(paged, made)
  return made
}
