import { parsedAs } from "@akasha/code/code-source"
import ts from "typescript"
import {
  refusing,
  splicing,
  stating,
} from "../../../../modules/answer/change-answer.module.code.ts"
import type { Said, Splice } from "../../../../modules/answer/change-answer.module.types.ts"
import type { World } from "../../../../modules/shadow/change-shadow.module.code.ts"

const NAMED = /^[A-Za-z_$][A-Za-z0-9_$]*$/

const RESERVED: ReadonlySet<string> = new Set([
  "await",
  "break",
  "case",
  "catch",
  "class",
  "const",
  "continue",
  "debugger",
  "default",
  "delete",
  "do",
  "else",
  "enum",
  "export",
  "extends",
  "false",
  "finally",
  "for",
  "function",
  "if",
  "implements",
  "import",
  "in",
  "instanceof",
  "interface",
  "let",
  "new",
  "null",
  "package",
  "private",
  "protected",
  "public",
  "return",
  "static",
  "super",
  "switch",
  "this",
  "throw",
  "true",
  "try",
  "typeof",
  "var",
  "void",
  "while",
  "with",
  "yield",
])

export type Asked = {
  readonly at: number
  readonly to: string
}

function scoping(node: ts.Node): boolean {
  return (
    ts.isSourceFile(node) ||
    ts.isBlock(node) ||
    ts.isCaseBlock(node) ||
    ts.isCatchClause(node) ||
    ts.isForStatement(node) ||
    ts.isForInStatement(node) ||
    ts.isForOfStatement(node) ||
    ts.isFunctionDeclaration(node) ||
    ts.isFunctionExpression(node) ||
    ts.isArrowFunction(node) ||
    ts.isMethodDeclaration(node) ||
    ts.isConstructorDeclaration(node)
  )
}

function scopeAbove(node: ts.Node): ts.Node {
  let held: ts.Node | undefined = node.parent
  while (held !== undefined && !scoping(held)) held = held.parent
  return held ?? node.getSourceFile()
}

function namesOf(name: ts.BindingName, into: Map<string, ts.Node>): undefined {
  if (ts.isIdentifier(name)) {
    into.set(name.text, name)
    return
  }
  for (const one of name.elements) {
    if (ts.isOmittedExpression(one)) continue
    namesOf(one.name, into)
  }
}

function declaredIn(scope: ts.Node): ReadonlyMap<string, ts.Node> {
  const found = new Map<string, ts.Node>()
  if (ts.isFunctionLike(scope)) for (const one of scope.parameters) namesOf(one.name, found)
  if (ts.isCatchClause(scope) && scope.variableDeclaration !== undefined) {
    namesOf(scope.variableDeclaration.name, found)
  }
  const walk = (node: ts.Node): undefined => {
    if (ts.isVariableDeclaration(node)) namesOf(node.name, found)
    else if (ts.isFunctionDeclaration(node) && node.name !== undefined) {
      found.set(node.name.text, node.name)
    } else if (ts.isClassDeclaration(node) && node.name !== undefined) {
      found.set(node.name.text, node.name)
    } else if (ts.isImportSpecifier(node) || ts.isNamespaceImport(node)) {
      found.set(node.name.text, node.name)
    } else if (ts.isImportClause(node) && node.name !== undefined) {
      found.set(node.name.text, node.name)
    }
    if (node !== scope && scoping(node)) return
    ts.forEachChild(node, walk)
  }
  ts.forEachChild(scope, walk)
  return found
}

function referencing(node: ts.Identifier): boolean {
  const up = node.parent
  if (up === undefined) return false
  if (ts.isPropertyAccessExpression(up)) return up.name !== node
  if (ts.isQualifiedName(up)) return up.right !== node
  if (ts.isPropertyAssignment(up)) return up.name !== node
  if (ts.isBindingElement(up)) return up.propertyName !== node
  if (ts.isImportSpecifier(up) || ts.isExportSpecifier(up)) return false
  if (ts.isMethodDeclaration(up) || ts.isPropertyDeclaration(up)) return up.name !== node
  if (ts.isPropertySignature(up) || ts.isMethodSignature(up)) return up.name !== node
  return true
}

function identifiersIn(node: ts.Node): readonly ts.Identifier[] {
  const found: ts.Identifier[] = []
  const walk = (one: ts.Node): undefined => {
    if (ts.isIdentifier(one)) found.push(one)
    ts.forEachChild(one, walk)
  }
  walk(node)
  return found
}

function askedAt(source: ts.SourceFile, at: number): ts.Identifier | null {
  for (const one of identifiersIn(source)) {
    if (one.getStart(source) <= at && at < one.getEnd()) return one
  }
  return null
}

function bindingOf(
  named: ts.Identifier
): { readonly scope: ts.Node; readonly declared: ts.Node } | null {
  let scope: ts.Node = scopeAbove(named)
  for (;;) {
    const declared = declaredIn(scope).get(named.text)
    if (declared !== undefined) return { scope, declared }
    if (ts.isSourceFile(scope)) return null
    scope = scopeAbove(scope)
  }
}

function localDeclaration(declared: ts.Node): string | null {
  const up = declared.parent
  if (up === undefined) return "the binding has no declaration this change can read"
  if (ts.isBindingElement(up)) return "a destructured name is no simple binding"
  if (ts.isParameter(up))
    return ts.isIdentifier(up.name) ? null : "a destructured name is no simple binding"
  if (!ts.isVariableDeclaration(up)) return "the binding is no `let`, `const` or parameter"
  if (!ts.isIdentifier(up.name)) return "a destructured declaration is no simple binding"
  const list = up.parent
  if (!ts.isVariableDeclarationList(list)) return "the declaration sits in no declaration list"
  const held = ts.getCombinedNodeFlags(list)
  const blocked = (held & ts.NodeFlags.Let) !== 0 || (held & ts.NodeFlags.Const) !== 0
  return blocked ? null : "a `var` binding is scoped by its function rather than by its block"
}

function exportedIn(source: ts.SourceFile, declared: ts.Node, of: string): boolean {
  let held: ts.Node | undefined = declared
  while (held !== undefined && !ts.isSourceFile(held)) {
    if (ts.canHaveModifiers(held)) {
      for (const one of ts.getModifiers(held) ?? []) {
        if (one.kind === ts.SyntaxKind.ExportKeyword) return true
      }
    }
    held = held.parent
  }
  for (const one of identifiersIn(source)) {
    const up = one.parent
    if (up !== undefined && ts.isExportSpecifier(up) && one.text === of) return true
  }
  return false
}

function shadowedIn(scope: ts.Node, of: string): boolean {
  let found = false
  const walk = (node: ts.Node): undefined => {
    if (node !== scope && scoping(node) && declaredIn(node).has(of)) {
      found = true
      return
    }
    ts.forEachChild(node, walk)
  }
  ts.forEachChild(scope, walk)
  return found
}

function takenBy(source: ts.SourceFile, scope: ts.Node, to: string): string | null {
  for (const one of identifiersIn(source)) {
    const up = one.parent
    const declaring =
      (ts.isVariableDeclaration(up) || ts.isParameter(up) || ts.isBindingElement(up)) &&
      up.name === one
    if (declaring && one.text === to) return `\`${to}\` is already declared in this file`
  }
  for (const one of identifiersIn(scope)) {
    if (one.text === to) return `\`${to}\` is already named where the binding is visible`
  }
  return null
}

function spanning(scope: ts.Node, of: string): readonly ts.Identifier[] {
  return identifiersIn(scope).filter((one) => one.text === of && referencing(one))
}

export function renameLocalVariable(path: string, text: string, given: Asked): Said {
  if (!NAMED.test(given.to)) return refusing(`\`${given.to}\` is no identifier`)
  if (RESERVED.has(given.to)) return refusing(`\`${given.to}\` is a reserved word`)
  const source = parsedAs(path, text)
  const named = askedAt(source, given.at)
  if (named === null) return refusing(`nothing at ${given.at} is an identifier`)
  if (named.text === given.to) return refusing(`\`${given.to}\` is the name it already carries`)
  const bound = bindingOf(named)
  if (bound === null) return refusing(`\`${named.text}\` is bound by nothing in this file`)
  if (ts.isSourceFile(bound.scope) && exportedIn(source, bound.declared, named.text))
    return refusing(`\`${named.text}\` is exported, so its reach runs past this file`)
  const why = localDeclaration(bound.declared)
  if (why !== null) return refusing(why)
  if (shadowedIn(bound.scope, named.text))
    return refusing(`\`${named.text}\` is declared again inside its own scope`)
  const taken = takenBy(source, bound.scope, given.to)
  if (taken !== null) return refusing(taken)
  const found = spanning(bound.scope, named.text)
  if (found.length === 0) return refusing(`\`${named.text}\` names nothing inside its own scope`)
  const splices: Splice[] = found.map((one) => {
    const shorthand = one.parent !== undefined && ts.isShorthandPropertyAssignment(one.parent)
    return {
      from: one.getStart(source),
      to: one.getEnd(),
      put: shorthand ? `${named.text}: ${given.to}` : given.to,
    }
  })
  return stating(splicing(path, text, splices))
}

export type Given = {
  readonly at: string
  readonly spot: number
  readonly to: string
}

export function runChange(world: World, given: Given): Said {
  const text = world.textOf(given.at)
  if (text === null) return refusing(`\`${given.at}\` holds no body, so nothing is renamed`)
  return renameLocalVariable(given.at, text, { at: given.spot, to: given.to })
}
