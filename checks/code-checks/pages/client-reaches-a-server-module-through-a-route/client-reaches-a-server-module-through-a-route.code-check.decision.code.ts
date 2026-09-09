import { dirname, join } from "node:path"
import { lineOf, parsedAs } from "@akasha/code/code-source"
import { partedIn } from "@akasha/pages/page-file-name"
import { slugFor } from "@akasha/pages/page-property-key"
import type { Value } from "@akasha/pages/page-value"
import ts from "typescript"
import { textNamed } from "../../../modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "../../../modules/judging/judging.module.code.ts"

export const APP = "router-app"

const TABLE = "route-table"

const ROUTED = ["root-route", "server-entry", "app-layout"]

const TESTED = "test"

const PARTED_BY = "/"

const SERVER_NAMED = /\.server(\.[cm]?[jt]sx?)?$/

const SERVER_FOLDER = /(^|\/)\.server\//

const MODULE_NAMED = /\.[cm]?[jt]sx?$/

const ONLY =
  "only a route module reaches the server, so take the import as a type or move the reach " +
  "into a route module's loader"

const NO_TABLE_NAMED =
  "the index declares no file name for a router app's route table, so which of an app's " +
  "modules are routes could not be worked out"

export type Asking = {
  readonly appsFiled: () => readonly string[]
  readonly valueAt: (path: string) => Value | null
  readonly namedFilesOf: (pageTypeSlug: string) => ReadonlyMap<string, string | null>
  readonly everyPath: () => readonly string[]
  readonly textAt: (path: string) => string | null
}

export type App = {
  readonly at: string
  readonly page: string
  readonly table: string
  readonly fixed: ReadonlySet<string>
}

export type Reached = {
  readonly said: string
  readonly line: number
}

export function folderOf(path: string): string {
  const at = dirname(path)
  return at === "." ? "" : `${at}${PARTED_BY}`
}

function carries(value: Value, propertySlug: string): boolean {
  return Object.keys(value).some((key) => slugFor(key) === propertySlug)
}

export function appsIn(asking: Asking): readonly App[] {
  const named = asking.namedFilesOf(APP)
  const table = named.get(TABLE) ?? null
  if (table === null) throw new Error(NO_TABLE_NAMED)
  const found: App[] = []
  for (const page of new Set(asking.appsFiled())) {
    const value = asking.valueAt(page)
    if (value === null) {
      throw new Error(`${page} is a router app the index files, and reads as nothing`)
    }
    const at = folderOf(page)
    const fixed = new Set<string>()
    for (const propertySlug of ROUTED) {
      const fileName = named.get(propertySlug) ?? null
      if (fileName !== null && carries(value, propertySlug)) fixed.add(`${at}${fileName}`)
    }
    found.push({ at, page, table: `${at}${table}`, fixed })
  }
  return found
}

export function modulesIn(path: string, text: string): readonly string[] {
  const source = parsedAs(path, text)
  const found: string[] = []
  const visit = (node: ts.Node): undefined => {
    if (ts.isStringLiteral(node) && MODULE_NAMED.test(node.text)) found.push(node.text)
    ts.forEachChild(node, visit)
  }
  ts.forEachChild(source, visit)
  return found
}

export function routesOf(app: App, asking: Asking): ReadonlySet<string> {
  const text = asking.textAt(app.table)
  if (text === null) {
    throw new Error(
      `${app.table} is a router app's route table, and reads as nothing, so which of that ` +
        "app's modules are routes could not be worked out"
    )
  }
  const found = new Set<string>(app.fixed)
  for (const said of modulesIn(app.table, text)) found.add(join(app.at, said))
  return found
}

export function serverNamed(said: string): boolean {
  return SERVER_NAMED.test(said) || SERVER_FOLDER.test(said)
}

function testNamed(path: string): boolean {
  return partedIn(path)?.sections.includes(TESTED) === true
}

export function passedOver(path: string, app: App, routes: ReadonlySet<string>): boolean {
  if (serverNamed(path) || testNamed(path)) return true
  return path === app.table || routes.has(path)
}

function typedImport(clause: ts.ImportClause): boolean {
  if (clause.isTypeOnly) return true
  if (clause.name !== undefined) return false
  const bound = clause.namedBindings
  if (bound === undefined || ts.isNamespaceImport(bound)) return false
  return bound.elements.every((one) => one.isTypeOnly)
}

function typedExport(node: ts.ExportDeclaration): boolean {
  if (node.isTypeOnly) return true
  const clause = node.exportClause
  if (clause === undefined || ts.isNamespaceExport(clause)) return false
  return clause.elements.every((one) => one.isTypeOnly)
}

function importedIn(node: ts.CallExpression): string | null {
  if (node.expression.kind !== ts.SyntaxKind.ImportKeyword) return null
  const first = node.arguments[0]
  return first !== undefined && ts.isStringLiteral(first) ? first.text : null
}

function reachedBy(node: ts.Node, source: ts.SourceFile): Reached | null {
  if (ts.isImportDeclaration(node)) {
    const said = node.moduleSpecifier
    if (!ts.isStringLiteral(said) || !serverNamed(said.text)) return null
    if (node.importClause !== undefined && typedImport(node.importClause)) return null
    return { said: said.text, line: lineOf(source, said) }
  }
  if (ts.isExportDeclaration(node) && node.moduleSpecifier !== undefined) {
    const said = node.moduleSpecifier
    if (!ts.isStringLiteral(said) || !serverNamed(said.text) || typedExport(node)) return null
    return { said: said.text, line: lineOf(source, said) }
  }
  if (!ts.isCallExpression(node)) return null
  const said = importedIn(node)
  if (said === null || !serverNamed(said)) return null
  return { said, line: lineOf(source, node) }
}

export function reachesIn(path: string, text: string): readonly Reached[] {
  const source = parsedAs(path, text)
  const found: Reached[] = []
  const visit = (node: ts.Node): undefined => {
    const one = reachedBy(node, source)
    if (one !== null) found.push(one)
    ts.forEachChild(node, visit)
  }
  ts.forEachChild(source, visit)
  return found
}

function reasonFor(one: Reached): string {
  return `line ${one.line} reaches \`${one.said}\`, a server-only module — ${ONLY}`
}

function underOf(app: App, paths: readonly string[]): readonly string[] {
  return paths.filter((one) => one.startsWith(app.at) && textNamed(one))
}

export function pathsFor(app: App, changed: readonly string[], asking: Asking): readonly string[] {
  const carried = underOf(app, changed)
  if (!carried.includes(app.table) && !carried.includes(app.page)) return carried
  return [...new Set([...carried, ...underOf(app, asking.everyPath())])].sort()
}

export function refusalsOver(changed: readonly string[], asking: Asking): readonly Judged[] {
  const said: Judged[] = []
  for (const app of appsIn(asking)) {
    const paths = pathsFor(app, changed, asking)
    if (paths.length === 0) continue
    const routes = routesOf(app, asking)
    for (const path of paths) {
      if (passedOver(path, app, routes)) continue
      const text = asking.textAt(path)
      if (text === null) continue
      for (const one of reachesIn(path, text)) said.push({ path, reason: reasonFor(one) })
    }
  }
  return said
}
