import {
  bodyOf,
  onDisk,
  textIn,
} from "akasha/checks/modules/change-walking/change-walking.module.code.ts"
import { lineOf, parsedAs } from "akasha/code/modules/source/code-source.module.code.ts"
import { landingOf } from "akasha/code/modules/specifier/code-specifier.module.code.ts"
import { exportedAs } from "akasha/pages/export-name/page-export-name.module.code.ts"
import type { Change } from "akasha/pages/modules/change/change.module.code.ts"
import ts from "typescript"

const COMMANDS_AT = "commands/pages/"

const CODE_NAMED = /^(.+)\.command\.code\.tsx?$/

const MODULE_NAMED = /^(.+)\.module\.code\.tsx?$/

const STEM = 1

const FIRST = 0

const NOWHERE = -1

const AFTER = 1

const ONE_HOP = 1

const ONE_READER = "takenFor"

const WORDS = "argv"

const DEFAULT = "default"

const INSTEAD =
  `a command takes the words of its call through \`${ONE_READER}\`, ` +
  "which reads them from the argument pages that command's page names"

type Held = ReadonlyMap<string, ts.FunctionLikeDeclaration>

type Found = {
  readonly at: string
  readonly line: number
  readonly how: string
}

export type Opening = (at: string) => string | null

type Reached = {
  readonly at: string
  readonly named: string
}

type Opened = {
  readonly source: ts.SourceFile
  readonly declared: Held
  readonly imported: ReadonlyMap<string, Reached>
  readonly whole: ReadonlyMap<string, string>
}

export type Reach = {
  readonly open: Opening
  readonly held: Map<string, Opened | null>
}

type Shared = {
  readonly reach: Reach
  readonly walked: Set<string>
  readonly seen: Found[]
}

type Reading = {
  readonly shared: Shared
  readonly at: string
  readonly opened: Opened
  readonly hops: number
}

type Taking = {
  readonly holder: ts.FunctionLikeDeclaration
  readonly at: number
}

const NOTHING_OPENS: Opening = () => null

export function reaching(open: Opening): Reach {
  return { open, held: new Map() }
}

export function openingIn(change: Change): Opening {
  return (at) => textIn(change, at)
}

export function openingUnder(root: string): Opening {
  const disk = onDisk(root)
  return (at) => {
    const bytes = disk(at)
    return bytes === null ? null : bodyOf({ root, path: at, bytes })
  }
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

function judgedIn(path: string): boolean {
  return slugOf(path) !== null || moduleOf(path) !== null
}

function functionOf(node: ts.Expression): ts.FunctionLikeDeclaration | null {
  if (ts.isArrowFunction(node) || ts.isFunctionExpression(node)) return node
  return null
}

function defaulted(one: ts.FunctionDeclaration): boolean {
  return one.modifiers?.some((each) => each.kind === ts.SyntaxKind.DefaultKeyword) === true
}

function declaredIn(source: ts.SourceFile): Held {
  const every = new Map<string, ts.FunctionLikeDeclaration>()
  for (const one of source.statements) {
    if (ts.isFunctionDeclaration(one)) {
      if (one.name !== undefined) every.set(one.name.text, one)
      if (defaulted(one)) every.set(DEFAULT, one)
    }
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
  const key = `${state.at} ${holder.pos} ${at}`
  if (state.shared.walked.has(key)) return
  state.shared.walked.add(key)
  const taking = holder.parameters[at]
  const body = holder.body
  if (taking === undefined || body === undefined || !ts.isIdentifier(taking.name)) return
  const words = taking.name.text
  const visit = (node: ts.Node): undefined => {
    if (ts.isIdentifier(node) && node.text === words && named(node)) {
      const call = handedOn(node)
      if (call === null) {
        const line = lineOf(state.opened.source, node)
        state.shared.seen.push({ at: state.at, line, how: sayingOf(node) })
      } else followed(state, call, node)
    }
    ts.forEachChild(node, visit)
  }
  ts.forEachChild(body, visit)
}

function specifierOf(node: ts.Expression): string | null {
  const call = ts.isAwaitExpression(node) ? node.expression : node
  if (!ts.isCallExpression(call)) return null
  if (call.expression.kind !== ts.SyntaxKind.ImportKeyword) return null
  const said = call.arguments[FIRST]
  if (said === undefined || !ts.isStringLiteral(said)) return null
  return said.text
}

function broughtIn(
  path: string,
  source: ts.SourceFile,
  every: Map<string, Reached>,
  whole: Map<string, string>
): undefined {
  const visit = (node: ts.Node): undefined => {
    if (ts.isVariableDeclaration(node) && node.initializer !== undefined) {
      const said = specifierOf(node.initializer)
      const at = said === null ? null : landingOf(path, said)
      if (at !== null && ts.isIdentifier(node.name)) whole.set(node.name.text, at)
      if (at !== null && ts.isObjectBindingPattern(node.name)) {
        for (const each of node.name.elements) {
          if (!ts.isIdentifier(each.name)) continue
          const from = each.propertyName
          const wanted = from !== undefined && ts.isIdentifier(from) ? from.text : each.name.text
          every.set(each.name.text, { at, named: wanted })
        }
      }
    }
    ts.forEachChild(node, visit)
  }
  ts.forEachChild(source, visit)
}

function importedIn(
  path: string,
  source: ts.SourceFile,
  whole: Map<string, string>
): ReadonlyMap<string, Reached> {
  const every = new Map<string, Reached>()
  for (const one of source.statements) {
    if (!ts.isImportDeclaration(one) || !ts.isStringLiteral(one.moduleSpecifier)) continue
    const clause = one.importClause
    const bound = clause?.namedBindings
    if (clause === undefined || clause.isTypeOnly || bound === undefined) continue
    if (!ts.isNamedImports(bound)) continue
    const at = landingOf(path, one.moduleSpecifier.text)
    if (at === null) continue
    for (const each of bound.elements) {
      if (each.isTypeOnly) continue
      every.set(each.name.text, { at, named: each.propertyName?.text ?? each.name.text })
    }
  }
  broughtIn(path, source, every, whole)
  return every
}

function openedOf(path: string, source: ts.SourceFile): Opened {
  const whole = new Map<string, string>()
  const imported = importedIn(path, source, whole)
  return { source, declared: declaredIn(source), imported, whole }
}

function openedAt(reach: Reach, at: string): Opened | null {
  const held = reach.held.get(at)
  if (held !== undefined) return held
  const text = reach.open(at)
  const made = text === null ? null : openedOf(at, parsedAs(at, text))
  reach.held.set(at, made)
  return made
}

function meantBy(from: ts.Node | undefined, spelled: string): string | null {
  if (from === undefined) return spelled
  if (!ts.isFunctionLike(from)) return meantBy(from.parent, spelled)
  const one = from.parameters.find(
    (each) => ts.isIdentifier(each.name) && each.name.text === spelled
  )
  if (one === undefined) return meantBy(from.parent, spelled)
  const made = one.initializer
  if (made === undefined || !ts.isIdentifier(made)) return null
  return made.text
}

function reachedInto(state: Reading, held: Reached, at: number): undefined {
  if (state.hops >= ONE_HOP) return
  if (judgedIn(held.at)) return
  const opened = openedAt(state.shared.reach, held.at)
  if (opened === null) return
  const into = opened.declared.get(held.named)
  if (into === undefined) return
  reading({ shared: state.shared, at: held.at, opened, hops: state.hops + ONE_HOP }, into, at)
}

function hopped(state: Reading, spelled: string, at: number): undefined {
  const held = state.opened.imported.get(spelled)
  if (held === undefined) return
  reachedInto(state, held, at)
}

function reachedOn(state: Reading, callee: ts.PropertyAccessExpression, at: number): undefined {
  if (!ts.isIdentifier(callee.expression) || !ts.isIdentifier(callee.name)) return
  const held = state.opened.whole.get(callee.expression.text)
  if (held === undefined) return
  reachedInto(state, { at: held, named: callee.name.text }, at)
}

function followed(state: Reading, call: ts.CallExpression, node: ts.Identifier): undefined {
  const callee = call.expression
  const at = call.arguments.indexOf(node)
  if (ts.isPropertyAccessExpression(callee)) return reachedOn(state, callee, at)
  if (!ts.isIdentifier(callee)) return
  const spelled = meantBy(call.parent, callee.text)
  if (spelled === null || spelled === ONE_READER) return
  const into = state.opened.declared.get(spelled)
  if (into === undefined) hopped(state, spelled, at)
  else reading(state, into, at)
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

function takingFor(path: string, opened: Opened): readonly Taking[] {
  const slug = slugOf(path)
  if (slug === null) return takingsIn(opened.source)
  const holder = opened.declared.get(exportedAs(slug))
  return holder === undefined ? [] : [{ holder, at: FIRST }]
}

function sayingFor(path: string, one: Found): string {
  if (one.at === path) return `line ${one.line} ${one.how} — ${INSTEAD}`
  return `${one.at} line ${one.line} ${one.how}, and this hands those words there — ${INSTEAD}`
}

function before(path: string, one: Found, other: Found): number {
  const mine = (held: Found): number => (held.at === path ? FIRST : AFTER)
  if (mine(one) !== mine(other)) return mine(one) - mine(other)
  if (one.at !== other.at) return one.at < other.at ? NOWHERE : AFTER
  return one.line - other.line
}

export function found(path: string, text: string, reach?: Reach): readonly string[] {
  if (!judgedIn(path)) return []
  const opened = openedOf(path, parsedAs(path, text))
  const shared: Shared = { reach: reach ?? reaching(NOTHING_OPENS), walked: new Set(), seen: [] }
  const state: Reading = { shared, at: path, opened, hops: FIRST }
  for (const one of takingFor(path, opened)) reading(state, one.holder, one.at)
  const said = [...shared.seen].sort((one, other) => before(path, one, other))
  return said.map((one) => sayingFor(path, one))
}
