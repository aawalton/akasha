import { lineOf, parsedAs } from "akasha/code/source/code-source.module.code.ts"
import { exportedAs } from "akasha/pages/export-name/page-export-name.module.code.ts"
import ts from "typescript"

const COMMANDS_AT = "commands/pages/"

const CODE_NAMED = /^(.+)\.command\.code\.tsx?$/

const MODULE_NAMED = /^(.+)\.module\.code\.tsx?$/

const STEM = 1

const FIRST = 0

const NOWHERE = -1

const ONE_READER = "takenFor"

const WORDS = "argv"

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

type Taking = {
  readonly holder: ts.FunctionLikeDeclaration
  readonly at: number
}

function tailOf(path: string): string | null {
  if (!path.startsWith(COMMANDS_AT)) return null
  const parts = path.slice(COMMANDS_AT.length).split("/")
  return parts[parts.length - STEM] ?? null
}

export function slugOf(path: string): string | null {
  const held = tailOf(path)
  if (held === null) return null
  return CODE_NAMED.exec(held)?.[STEM] ?? null
}

export function moduleOf(path: string): string | null {
  const held = tailOf(path)
  if (held === null) return null
  return MODULE_NAMED.exec(held)?.[STEM] ?? null
}

export function judgedIn(path: string): boolean {
  return slugOf(path) !== null || moduleOf(path) !== null
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

function saidOut(one: ts.FunctionDeclaration | ts.VariableStatement): boolean {
  return one.modifiers?.some((each) => each.kind === ts.SyntaxKind.ExportKeyword) === true
}

function wordsAt(holder: ts.FunctionLikeDeclaration): number {
  return holder.parameters.findIndex((one) => ts.isIdentifier(one.name) && one.name.text === WORDS)
}

function takingsIn(source: ts.SourceFile): readonly Taking[] {
  const every: Taking[] = []
  const hold = (holder: ts.FunctionLikeDeclaration): undefined => {
    const at = wordsAt(holder)
    if (at !== NOWHERE) every.push({ holder, at })
  }
  for (const one of source.statements) {
    if (ts.isFunctionDeclaration(one) && saidOut(one)) hold(one)
    if (!ts.isVariableStatement(one) || !saidOut(one)) continue
    for (const held of one.declarationList.declarations) {
      if (held.initializer === undefined) continue
      const made = functionOf(held.initializer)
      if (made !== null) hold(made)
    }
  }
  return every
}

function takingFor(path: string, source: ts.SourceFile, declared: Held): readonly Taking[] {
  const slug = slugOf(path)
  if (slug === null) return takingsIn(source)
  const holder = declared.get(exportedAs(slug))
  return holder === undefined ? [] : [{ holder, at: FIRST }]
}

export function found(path: string, text: string): readonly string[] {
  if (!judgedIn(path)) return []
  const source = parsedAs(path, text)
  const declared = declaredIn(source)
  const state: Reading = { source, declared, walked: new Set(), seen: [] }
  for (const one of takingFor(path, source, declared)) reading(state, one.holder, one.at)
  const said = [...state.seen].sort((one, other) => one.line - other.line)
  return said.map((one) => `line ${one.line} ${one.how} — ${INSTEAD}`)
}
