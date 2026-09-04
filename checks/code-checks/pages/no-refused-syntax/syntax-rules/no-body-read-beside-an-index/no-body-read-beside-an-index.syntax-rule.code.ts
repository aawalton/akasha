import { lineOf } from "@akasha/code-system/code-source"
import ts from "typescript"
import type { Refusal, Standing } from "../syntax-rule.page-type.ts"

const FACES: ReadonlyMap<string, ReadonlySet<string>> = new Map([
  ["Answering", new Set(["answering", "index-answering"])],
  ["Reading", new Set(["shape", "index-shape"])],
  ["Shadow", new Set(["shadow"])],
])

const READERS: ReadonlyMap<string, ReadonlySet<string>> = new Map([
  ["valueAt", new Set(["page-value"])],
  ["accountValuesIn", new Set(["claude-account-reading"])],
])

const ROOT_WORDS: ReadonlySet<string> = new Set(["root", "repo", "repository"])

const INSTEAD =
  "take the reader of page bodies from the caller as `PageOf` rather than making one out of the root"

function moduleOf(specifier: string): string {
  const last = specifier.split("/").at(-1) ?? specifier
  return last.replace(/\.[cm]?tsx?$/, "").replace(/\.(module|index)\.code$/, "")
}

function boundTo(
  source: ts.SourceFile,
  wanted: ReadonlyMap<string, ReadonlySet<string>>
): ReadonlySet<string> {
  const named = new Set<string>()
  for (const one of source.statements) {
    if (!ts.isImportDeclaration(one) || !ts.isStringLiteral(one.moduleSpecifier)) continue
    const from = moduleOf(one.moduleSpecifier.text)
    const bound = one.importClause?.namedBindings
    if (bound === undefined || !ts.isNamedImports(bound)) continue
    for (const each of bound.elements) {
      const original = each.propertyName?.text ?? each.name.text
      if (wanted.get(original)?.has(from) === true) named.add(each.name.text)
    }
  }
  return named
}

function saysText(node: ts.TypeNode): boolean {
  if (node.kind === ts.SyntaxKind.StringKeyword) return true
  if (ts.isUnionTypeNode(node)) return node.types.some(saysText)
  if (ts.isParenthesizedTypeNode(node)) return saysText(node.type)
  return false
}

function namesAFace(node: ts.TypeNode, faces: ReadonlySet<string>): boolean {
  let found = false
  const visit = (one: ts.Node): undefined => {
    if (found) return undefined
    if (
      ts.isTypeReferenceNode(one) &&
      ts.isIdentifier(one.typeName) &&
      faces.has(one.typeName.text)
    ) {
      found = true
      return undefined
    }
    ts.forEachChild(one, visit)
    return undefined
  }
  visit(node)
  return found
}

function isARoot(name: string): boolean {
  return name
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .some((word) => ROOT_WORDS.has(word))
}

function calledAs(call: ts.CallExpression): string | undefined {
  const target = call.expression
  return ts.isIdentifier(target) ? target.text : undefined
}

function mentions(node: ts.Node, name: string): boolean {
  let found = false
  const visit = (one: ts.Node): undefined => {
    if (found) return undefined
    if (ts.isIdentifier(one) && one.text === name) {
      found = true
      return undefined
    }
    ts.forEachChild(one, visit)
    return undefined
  }
  visit(node)
  return found
}

type Held = { readonly name: string; readonly fn: ts.SignatureDeclaration & { body: ts.Node } }

function namedFunctionIn(node: ts.Node): Held | undefined {
  if (ts.isFunctionDeclaration(node) && node.name !== undefined && node.body !== undefined) {
    return { name: node.name.text, fn: node as ts.FunctionDeclaration & { body: ts.Node } }
  }
  if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name)) {
    const held = node.initializer
    if (held !== undefined && (ts.isArrowFunction(held) || ts.isFunctionExpression(held))) {
      return { name: node.name.text, fn: held as typeof held & { body: ts.Node } }
    }
  }
  return undefined
}

function rootsOf(fn: ts.SignatureDeclaration): readonly string[] {
  const found: string[] = []
  for (const one of fn.parameters) {
    if (one.type === undefined || !ts.isIdentifier(one.name)) continue
    if (saysText(one.type) && isARoot(one.name.text)) found.push(one.name.text)
  }
  return found
}

function asksTheIndex(fn: ts.SignatureDeclaration, faces: ReadonlySet<string>): boolean {
  return fn.parameters.some((one) => one.type !== undefined && namesAFace(one.type, faces))
}

type Read = {
  readonly call: ts.CallExpression
  readonly called: string
  readonly root: string
}

function readingIn(
  body: ts.Node,
  roots: readonly string[],
  readers: ReadonlySet<string>
): Read | undefined {
  let found: Read | undefined
  const walk = (one: ts.Node): undefined => {
    if (found !== undefined) return undefined
    if (ts.isCallExpression(one)) {
      const called = calledAs(one)
      if (called !== undefined && readers.has(called)) {
        const root = roots.find((each) => one.arguments.some((arg) => mentions(arg, each)))
        if (root !== undefined) {
          found = { call: one, called, root }
          return undefined
        }
      }
    }
    ts.forEachChild(one, walk)
    return undefined
  }
  walk(body)
  return found
}

function readersOver(source: ts.SourceFile, imported: ReadonlySet<string>): ReadonlySet<string> {
  const held: Held[] = []
  const visit = (node: ts.Node): undefined => {
    const one = namedFunctionIn(node)
    if (one !== undefined) held.push(one)
    ts.forEachChild(node, visit)
    return undefined
  }
  ts.forEachChild(source, visit)
  const named = new Set(imported)
  for (let turning = true; turning; ) {
    turning = false
    for (const one of held) {
      if (named.has(one.name)) continue
      const roots = rootsOf(one.fn)
      if (roots.length === 0) continue
      if (readingIn(one.fn.body, roots, named) === undefined) continue
      named.add(one.name)
      turning = true
    }
  }
  return named
}

export function noBodyReadBesideAnIndex(given: Standing): readonly Refusal[] {
  const source = given.source
  const faces = boundTo(source, FACES)
  if (faces.size === 0) return []
  const imported = boundTo(source, READERS)
  if (imported.size === 0) return []
  const readers = readersOver(source, imported)
  const found: Refusal[] = []
  const visit = (node: ts.Node): undefined => {
    ts.forEachChild(node, visit)
    if (!ts.isFunctionLike(node)) return undefined
    const body = (node as ts.FunctionLikeDeclaration).body
    if (body === undefined) return undefined
    if (!asksTheIndex(node, faces)) return undefined
    const roots = rootsOf(node)
    if (roots.length === 0) return undefined
    const said = readingIn(body, roots, readers)
    if (said === undefined) return undefined
    found.push({
      line: lineOf(source, said.call),
      reason:
        `\`${said.called}\` reads a page body from \`${said.root}\` where the index is asked ` +
        `through a parameter of the same function, so half the answer comes off the working tree ` +
        `the change is not in — ${INSTEAD}`,
    })
    return undefined
  }
  ts.forEachChild(source, visit)
  return found
}
