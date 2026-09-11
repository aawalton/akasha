import { join } from "node:path"
import type { Judged } from "akasha/checks/modules/judging/judging.module.code.ts"
import {
  APP,
  folderOf,
  modulesIn,
  pathsFor,
  serverNamed,
} from "akasha/checks/modules/router-app-code/router-app-code.module.code.ts"
import { lineOf, parsedAs, typedImport } from "akasha/code/code-source/code-source.module.code.ts"
import { landingOf } from "akasha/code/code-specifier/code-specifier.module.code.ts"
import { partedIn } from "akasha/pages/file-name/page-file-name.module.code.ts"
import ts from "typescript"

const TABLE = "route-table"

const ROOTED = "root-route"

const APART = [
  "server",
  "server-entry",
  "route-table",
  "vite-config",
  "router-config",
  "compile-config",
  "test-preload",
]

const SERVED_ALONE: ReadonlySet<string> = new Set(["loader", "action"])

const TESTED = ["test", "test-fixtures"]

const PARTED_BY = "/"

const ANYTHING = "*"

const DEFAULT = "default"

const PROCESS = "process"

const ENV = "env"

const KEYED = "process.env["

const NEXT_NAMED = "NEXT_PUBLIC_"

const VITE_NAMED = "VITE_"

const CODE_NAMED = /\.tsx?$/

const INSTEAD =
  "write the name out in full inside `process.env`, or read `import.meta.env`, which no key defeats"

const NO_TABLE_NAMED =
  "the index declares no file name for a router app's route table, so which of an app's " +
  "modules the browser is handed could not be worked out"

export type Asking = {
  readonly appsFiled: () => readonly string[]
  readonly namedFilesOf: (pageTypeSlug: string) => ReadonlyMap<string, string | null>
  readonly everyPath: () => readonly string[]
  readonly textAt: (path: string) => string | null
}

export type App = {
  readonly at: string
  readonly page: string
  readonly table: string
  readonly apart: ReadonlySet<string>
  readonly rooted: string | null
}

export function appsIn(asking: Asking): readonly App[] {
  const named = asking.namedFilesOf(APP)
  const table = named.get(TABLE) ?? null
  if (table === null) throw new Error(NO_TABLE_NAMED)
  const rooted = named.get(ROOTED) ?? null
  const found: App[] = []
  for (const page of new Set(asking.appsFiled())) {
    const at = folderOf(page)
    const apart = new Set<string>()
    for (const propertySlug of APART) {
      const fileName = named.get(propertySlug) ?? null
      if (fileName !== null) apart.add(`${at}${fileName}`)
    }
    found.push({
      at,
      page,
      table: `${at}${table}`,
      apart,
      rooted: rooted === null ? null : `${at}${rooted}`,
    })
  }
  return found
}

export function routesOf(app: App, asking: Asking): ReadonlySet<string> {
  const text = asking.textAt(app.table)
  if (text === null) {
    throw new Error(
      `${app.table} is a router app's route table, and reads as nothing, so which of that ` +
        "app's modules the browser is handed could not be worked out"
    )
  }
  const found = new Set<string>()
  if (app.rooted !== null) found.add(app.rooted)
  for (const said of modulesIn(app.table, text)) found.add(join(app.at, said))
  return found
}

function testNamed(path: string): boolean {
  const sections = partedIn(path)?.sections ?? []
  return TESTED.some((one) => sections.includes(one))
}

export function passedOver(path: string, app: App): boolean {
  if (!CODE_NAMED.test(path)) return true
  return serverNamed(path) || testNamed(path) || app.apart.has(path)
}

function namesOf(statement: ts.Statement): readonly string[] {
  if (ts.isVariableStatement(statement)) {
    return statement.declarationList.declarations.map((one) =>
      ts.isIdentifier(one.name) ? one.name.text : ANYTHING
    )
  }
  if (ts.isFunctionDeclaration(statement) || ts.isClassDeclaration(statement)) {
    return [statement.name?.text ?? DEFAULT]
  }
  return [ANYTHING]
}

export function exportsIn(source: ts.SourceFile): readonly string[] {
  const found: string[] = []
  for (const statement of source.statements) {
    if (ts.isExportAssignment(statement)) {
      found.push(DEFAULT)
      continue
    }
    if (ts.isExportDeclaration(statement)) {
      if (!statement.isTypeOnly) found.push(ANYTHING)
      continue
    }
    if (ts.isTypeAliasDeclaration(statement) || ts.isInterfaceDeclaration(statement)) continue
    if (!ts.canHaveModifiers(statement)) continue
    const modifiers = ts.getModifiers(statement) ?? []
    if (!modifiers.some((one) => one.kind === ts.SyntaxKind.ExportKeyword)) continue
    if (modifiers.some((one) => one.kind === ts.SyntaxKind.DefaultKeyword)) {
      found.push(DEFAULT)
      continue
    }
    found.push(...namesOf(statement))
  }
  return found
}

export function servedAlone(source: ts.SourceFile): boolean {
  const found = exportsIn(source)
  return found.length > 0 && found.every((one) => SERVED_ALONE.has(one))
}

function envKeyed(node: ts.Node): boolean {
  if (!ts.isElementAccessExpression(node)) return false
  const held = node.expression
  if (!ts.isPropertyAccessExpression(held) || held.name.text !== ENV) return false
  return ts.isIdentifier(held.expression) && held.expression.text === PROCESS
}

export function keyedIn(source: ts.SourceFile): readonly ts.Node[] {
  const found: ts.Node[] = []
  const visit = (node: ts.Node): undefined => {
    if (envKeyed(node)) found.push(node)
    ts.forEachChild(node, visit)
  }
  ts.forEachChild(source, visit)
  return found
}

function envNextNamed(node: ts.Node): node is ts.PropertyAccessExpression {
  if (!ts.isPropertyAccessExpression(node)) return false
  if (!node.name.text.startsWith(NEXT_NAMED)) return false
  const held = node.expression
  if (!ts.isPropertyAccessExpression(held) || held.name.text !== ENV) return false
  return ts.isIdentifier(held.expression) && held.expression.text === PROCESS
}

export function servedNodesIn(source: ts.SourceFile): ReadonlySet<ts.Node> {
  const found = new Set<ts.Node>()
  for (const statement of source.statements) {
    if (!ts.canHaveModifiers(statement)) continue
    const modifiers = ts.getModifiers(statement) ?? []
    if (!modifiers.some((one) => one.kind === ts.SyntaxKind.ExportKeyword)) continue
    const names = namesOf(statement)
    if (names.length > 0 && names.every((one) => SERVED_ALONE.has(one))) found.add(statement)
  }
  return found
}

export function nextNamedIn(
  source: ts.SourceFile,
  routed: boolean
): readonly ts.PropertyAccessExpression[] {
  const served = routed ? servedNodesIn(source) : new Set<ts.Node>()
  const found: ts.PropertyAccessExpression[] = []
  const visit = (node: ts.Node): undefined => {
    if (served.has(node)) return
    if (envNextNamed(node)) found.push(node)
    ts.forEachChild(node, visit)
  }
  ts.forEachChild(source, visit)
  return found
}

export function reachesByKey(path: string, text: string): boolean {
  if (!text.includes(KEYED)) return false
  return keyedIn(parsedAs(path, text)).length > 0
}

export function landedAt(
  path: string,
  specifier: string,
  known: (at: string) => boolean
): string | null {
  const landed = landingOf(path, specifier)
  if (landed !== null) return known(landed) ? landed : null
  const at = specifier.indexOf(PARTED_BY)
  if (at === -1) return null
  const tail = specifier.slice(at + 1)
  return known(tail) ? tail : null
}

function keyedSaid(line: number): string {
  return `line ${line} reaches \`process.env\` by a key no define replaces — ${INSTEAD}`
}

function reachedSaid(line: number, landed: string): string {
  return `line ${line} reaches \`${landed}\`, which reads \`process.env\` by a key — ${INSTEAD}`
}

function namedSaid(line: number, name: string): string {
  const vite = `${VITE_NAMED}${name.slice(NEXT_NAMED.length)}`
  return `line ${line} reads \`process.env.${name}\`, a name marked for Next — read \`import.meta.env.${vite}\` instead`
}

export function reasonsIn(
  path: string,
  text: string,
  routed: boolean,
  known: (at: string) => boolean,
  reaches: (at: string) => boolean
): readonly string[] {
  const source = parsedAs(path, text)
  if (routed && servedAlone(source)) return []
  const said: string[] = []
  for (const node of keyedIn(source)) said.push(keyedSaid(lineOf(source, node)))
  for (const node of nextNamedIn(source, routed)) {
    said.push(namedSaid(lineOf(source, node), node.name.text))
  }
  for (const statement of source.statements) {
    if (!ts.isImportDeclaration(statement)) continue
    if (!ts.isStringLiteral(statement.moduleSpecifier)) continue
    const clause = statement.importClause
    if (clause !== undefined && typedImport(clause)) continue
    const landed = landedAt(path, statement.moduleSpecifier.text, known)
    if (landed === null || landed === path || !reaches(landed)) continue
    said.push(reachedSaid(lineOf(source, statement), landed))
  }
  return said
}

export function refusalsOver(paths: readonly string[], asking: Asking): readonly Judged[] {
  const every = new Set(asking.everyPath())
  const known = (at: string): boolean => every.has(at)
  const held = new Map<string, boolean>()
  const reaches = (at: string): boolean => {
    const found = held.get(at)
    if (found !== undefined) return found
    const text = asking.textAt(at)
    const made = text !== null && reachesByKey(at, text)
    held.set(at, made)
    return made
  }
  const said: Judged[] = []
  for (const app of appsIn(asking)) {
    const under = pathsFor(app, paths, () => asking.everyPath()).filter(
      (one) => !passedOver(one, app)
    )
    if (under.length === 0) continue
    const routes = routesOf(app, asking)
    for (const path of under) {
      const text = asking.textAt(path)
      if (text === null) continue
      for (const one of reasonsIn(path, text, routes.has(path), known, reaches)) {
        said.push({ path, reason: one })
      }
    }
  }
  return said
}
