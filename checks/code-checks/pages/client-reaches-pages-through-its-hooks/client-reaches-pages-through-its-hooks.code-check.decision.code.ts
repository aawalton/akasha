import { join } from "node:path"
import { lineOf, parsedAs } from "@akasha/code/code-source"
import { landingOf } from "@akasha/code/code-specifier"
import { calledIn } from "@akasha/code/package-manifest"
import ts from "typescript"

export const PACKAGE = "workspace-package"

export const MANIFEST = "manifest"

const ACCESS = "pages-access"

const HOOKS = "pages-ui"

const STORE = "pages-ui-store"

export const DIRECTIVE = "use client"

const TABLE = "pages"

const FROM = "from"

const ON = "on"

const EVENT = "postgres_changes"

const TABLE_KEY = "table"

export type Side = {
  readonly folder: string
  readonly named: string | null
}

export type Sides = {
  readonly access: Side
  readonly hooks: Side
  readonly own: readonly string[]
}

export type Asking = {
  readonly folderOf: (slug: string) => string | null
  readonly manifestNamed: () => string | null
  readonly textAt: (path: string) => string | null
}

type Taken = {
  readonly names: ReadonlySet<string>
  readonly spaces: ReadonlySet<string>
}

export function sideIn(asking: Asking, slug: string): Side | null {
  const folder = asking.folderOf(slug)
  if (folder === null) return null
  const manifest = asking.manifestNamed()
  const named = manifest === null ? null : calledIn(asking.textAt(join(folder, manifest)))
  return { folder, named }
}

export function sidesIn(asking: Asking): Sides | null {
  const access = sideIn(asking, ACCESS)
  const hooks = sideIn(asking, HOOKS)
  if (access === null || hooks === null) return null
  const store = sideIn(asking, STORE)
  const own = store === null ? [hooks.folder] : [hooks.folder, store.folder]
  return { access, hooks, own }
}

function reaches(path: string, specifier: string, side: Side): boolean {
  const named = side.named
  if (named !== null && (specifier === named || specifier.startsWith(`${named}/`))) return true
  const landed = landingOf(path, specifier)
  if (landed === null) return false
  return landed === side.folder || landed.startsWith(`${side.folder}/`)
}

function clientSide(source: ts.SourceFile): boolean {
  for (const statement of source.statements) {
    if (!ts.isExpressionStatement(statement)) break
    if (!ts.isStringLiteral(statement.expression)) break
    if (statement.expression.text === DIRECTIVE) return true
  }
  return false
}

function takenFrom(source: ts.SourceFile, path: string, side: Side): Taken {
  const names = new Set<string>()
  const spaces = new Set<string>()
  for (const statement of source.statements) {
    if (!ts.isImportDeclaration(statement)) continue
    if (!ts.isStringLiteral(statement.moduleSpecifier)) continue
    if (!reaches(path, statement.moduleSpecifier.text, side)) continue
    const clause = statement.importClause
    if (clause === undefined || clause.isTypeOnly) continue
    if (clause.name !== undefined) names.add(clause.name.text)
    const bound = clause.namedBindings
    if (bound === undefined) continue
    if (ts.isNamespaceImport(bound)) spaces.add(bound.name.text)
    else for (const one of bound.elements) if (!one.isTypeOnly) names.add(one.name.text)
  }
  return { names, spaces }
}

function calledThrough(call: ts.CallExpression, taken: Taken): string | null {
  const expression = call.expression
  if (ts.isIdentifier(expression)) {
    return taken.names.has(expression.text) ? expression.text : null
  }
  if (!ts.isPropertyAccessExpression(expression)) return null
  if (!ts.isIdentifier(expression.expression)) return null
  if (!taken.spaces.has(expression.expression.text)) return null
  return `${expression.expression.text}.${expression.name.text}`
}

function readsTable(call: ts.CallExpression): boolean {
  const expression = call.expression
  if (!ts.isPropertyAccessExpression(expression) || expression.name.text !== FROM) return false
  const first = call.arguments[0]
  return first !== undefined && ts.isStringLiteralLike(first) && first.text === TABLE
}

function keyOf(field: ts.ObjectLiteralElementLike): string | null {
  const name = field.name
  if (name === undefined) return null
  if (ts.isIdentifier(name) || ts.isStringLiteralLike(name)) return name.text
  return null
}

function subscribes(call: ts.CallExpression): boolean {
  const expression = call.expression
  if (!ts.isPropertyAccessExpression(expression) || expression.name.text !== ON) return false
  const event = call.arguments[0]
  if (event === undefined || !ts.isStringLiteralLike(event) || event.text !== EVENT) return false
  const filter = call.arguments[1]
  if (filter === undefined || !ts.isObjectLiteralExpression(filter)) return false
  return filter.properties.some(
    (field) =>
      ts.isPropertyAssignment(field) &&
      keyOf(field) === TABLE_KEY &&
      ts.isStringLiteralLike(field.initializer) &&
      field.initializer.text === TABLE
  )
}

function saidAs(side: Side): string {
  return side.named ?? side.folder
}

function calledSaid(line: number, callee: string, sides: Sides): string {
  return (
    `line ${line} calls \`${callee}\`, which \`${saidAs(sides.access)}\` answers, ` +
    `outside any call to a \`${saidAs(sides.hooks)}\` hook`
  )
}

function tableSaid(line: number, sides: Sides): string {
  return (
    `line ${line} reads the \`${TABLE}\` table itself rather than through a ` +
    `\`${saidAs(sides.hooks)}\` hook`
  )
}

function subscribedSaid(line: number, sides: Sides): string {
  return (
    `line ${line} opens a \`${EVENT}\` subscription on the \`${TABLE}\` table rather than ` +
    `taking updates from a \`${saidAs(sides.hooks)}\` hook`
  )
}

export function reasonsIn(path: string, text: string, sides: Sides): readonly string[] {
  if (sides.own.some((one) => path === one || path.startsWith(`${one}/`))) return []
  const source = parsedAs(path, text)
  if (!clientSide(source)) return []
  const access = takenFrom(source, path, sides.access)
  const hooks = takenFrom(source, path, sides.hooks)
  const said: string[] = []
  const walk = (node: ts.Node, inside: boolean): undefined => {
    if (!ts.isCallExpression(node)) {
      ts.forEachChild(node, (child) => walk(child, inside))
      return
    }
    const wraps = calledThrough(node, hooks) !== null
    if (subscribes(node)) {
      said.push(subscribedSaid(lineOf(source, node), sides))
    } else if (!wraps && !inside) {
      const callee = calledThrough(node, access)
      if (callee !== null) said.push(calledSaid(lineOf(source, node), callee, sides))
      else if (readsTable(node)) said.push(tableSaid(lineOf(source, node), sides))
    }
    ts.forEachChild(node, (child) => walk(child, inside || wraps))
    return
  }
  ts.forEachChild(source, (child) => walk(child, false))
  return said
}
