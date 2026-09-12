import { lineOf, parsedAs } from "akasha/code/source/code-source.module.code.ts"
import { exportedAs } from "akasha/pages/export-name/page-export-name.module.code.ts"
import ts from "typescript"

const COMMANDS_AT = "commands/pages/"

const CODE_NAMED = /^(.+)\.command\.code\.tsx?$/

const STEM = 1

const ONE_READER = "takenFor"

const INSTEAD =
  `a command takes the words of its call through \`${ONE_READER}\`, ` +
  "which reads them from the argument pages that command's page names"

type Held = ReadonlyMap<string, ts.FunctionLikeDeclaration>

type Found = {
  readonly line: number
  readonly how: string
}

type Reading = {
  readonly source: ts.SourceFile
  readonly declared: Held
  readonly walked: Set<string>
  readonly seen: Found[]
}

export function slugOf(path: string): string | null {
  if (!path.startsWith(COMMANDS_AT)) return null
  const parts = path.slice(COMMANDS_AT.length).split("/")
  const held = parts[parts.length - STEM]
  if (held === undefined) return null
  return CODE_NAMED.exec(held)?.[STEM] ?? null
}

function functionOf(node: ts.Expression): ts.FunctionLikeDeclaration | null {
  if (ts.isArrowFunction(node) || ts.isFunctionExpression(node)) return node
  return null
}

export function declaredIn(source: ts.SourceFile): Held {
  const every = new Map<string, ts.FunctionLikeDeclaration>()
  for (const one of source.statements) {
    if (ts.isFunctionDeclaration(one) && one.name !== undefined) every.set(one.name.text, one)
    if (!ts.isVariableStatement(one)) continue
    for (const held of one.declarationList.declarations) {
      if (!ts.isIdentifier(held.name) || held.initializer === undefined) continue
      const made = functionOf(held.initializer)
      if (made !== null) every.set(held.name.text, made)
    }
  }
  return every
}

function named(node: ts.Identifier): boolean {
  const parent = node.parent
  if (parent === undefined) return false
  if (ts.isParameter(parent) || ts.isImportSpecifier(parent) || ts.isExportSpecifier(parent)) {
    return false
  }
  if (ts.isPropertyAccessExpression(parent) && parent.name === node) return false
  if (ts.isPropertyAssignment(parent) && parent.name === node) return false
  if (ts.isBindingElement(parent) && parent.name === node) return false
  return true
}

function handedOn(node: ts.Identifier): ts.CallExpression | null {
  const parent = node.parent
  if (parent === undefined || !ts.isCallExpression(parent)) return null
  return parent.arguments.includes(node) ? parent : null
}

function sayingOf(node: ts.Identifier): string {
  const parent = node.parent
  const words = node.text
  if (parent === undefined) return `reads \`${words}\``
  if (ts.isPropertyAccessExpression(parent) && ts.isIdentifier(parent.name)) {
    return `reads \`${words}.${parent.name.text}\``
  }
  if (ts.isElementAccessExpression(parent)) return `reads \`${words}\` by place`
  if (ts.isForOfStatement(parent)) return `walks \`${words}\` word by word`
  return `reads \`${words}\``
}

function reading(state: Reading, holder: ts.FunctionLikeDeclaration, at: number): undefined {
  const key = `${holder.pos} ${at}`
  if (state.walked.has(key)) return
  state.walked.add(key)
  const taking = holder.parameters[at]
  const body = holder.body
  if (taking === undefined || body === undefined || !ts.isIdentifier(taking.name)) return
  const words = taking.name.text
  const visit = (node: ts.Node): undefined => {
    if (ts.isIdentifier(node) && node.text === words && named(node)) {
      const call = handedOn(node)
      if (call === null) state.seen.push({ line: lineOf(state.source, node), how: sayingOf(node) })
      else followed(state, call, node)
    }
    ts.forEachChild(node, visit)
  }
  ts.forEachChild(body, visit)
}

function followed(state: Reading, call: ts.CallExpression, node: ts.Identifier): undefined {
  const callee = call.expression
  if (!ts.isIdentifier(callee)) return
  const into = state.declared.get(callee.text)
  if (into === undefined) return
  reading(state, into, call.arguments.indexOf(node))
}

export function found(path: string, text: string): readonly string[] {
  const slug = slugOf(path)
  if (slug === null) return []
  const source = parsedAs(path, text)
  const declared = declaredIn(source)
  const holder = declared.get(exportedAs(slug))
  if (holder === undefined) return []
  const state: Reading = { source, declared, walked: new Set(), seen: [] }
  reading(state, holder, 0)
  return state.seen.map((one) => `line ${one.line} ${one.how} — ${INSTEAD}`)
}
