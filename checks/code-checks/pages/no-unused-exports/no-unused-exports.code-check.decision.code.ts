import { basename, dirname } from "node:path"
import { exportsIn } from "akasha/checks/code-checks/pages/browser-code-reads-the-environment-by-a-name/browser-code-reads-the-environment-by-a-name.code-check.decision.code.ts"
import {
  pageTypesFor,
  textIn,
} from "akasha/checks/modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "akasha/checks/modules/judging/judging.module.code.ts"
import { typeScripted } from "akasha/code/bodies/modules/file-kind/file-kind.module.code.ts"
import { parsedAs } from "akasha/code/modules/source/code-source.module.code.ts"
import { landingOf } from "akasha/code/modules/specifier/code-specifier.module.code.ts"
import type { Change } from "akasha/pages/modules/change/change.module.code.ts"
import { exportedAs } from "akasha/pages/modules/export-name/page-export-name.module.code.ts"
import {
  type Parted,
  pageNamed,
  pageOf,
  partedIn,
  uncommittedNamed,
} from "akasha/pages/modules/file-name/page-file-name.module.code.ts"
import type { Shadow } from "akasha/pages/modules/shadow/shadow.module.code.ts"
import { nameFor } from "akasha/pages/modules/uncommitted/page-uncommitted.module.code.ts"
import { loadedFrom } from "akasha/pages/modules/value/page-value.module.code.ts"
import { textAt } from "akasha/pages/modules/value-reading/page-value-reading.module.code.ts"
import ts from "typescript"

const PUBLISHED = "a value only its own file names is published for nothing"

const REACHED = "a value nothing names is code nothing runs"

const ANYTHING = "*"

const DEFAULT = "default"

const INTRINSIC = /^[a-z]/

const WHOLE = "import("

const HELD = "ts"

const ROUTE = "route"

const LUALIB = "lualib"

const LUA_EXPORT = "luaExport"

const COMMAND = "command"

const COMPUTED = "computed-property"

const WORK = "work"

const GUARD = "change-guard"

const RUN_GUARD = "runGuard"

const CHECK = "code-check"

const MANIFEST = "manifest"

const BUILD_ENV = "BUILD_ENV"

const PERFORMANCE = "performance"

const MEASURED = "measured"

const MODEL_TEST = "model-test"

const ASKING = "asking"

const KEEPING = "keeping"

const PAGE_TYPE = "page-type"

const GENERATOR = "type-generator"

const GENERATED: ReadonlySet<string> = new Set(["couldTurn", "generateTypes"])

const ROOT_ROUTE = "root.tsx"

const APP_LAYOUT = "_app-layout.tsx"

const ROUTED: ReadonlySet<string> = new Set([
  "ErrorBoundary",
  "HydrateFallback",
  "Layout",
  "action",
  "clientAction",
  "clientLoader",
  "handle",
  "headers",
  "links",
  "loader",
  "meta",
  "shouldRevalidate",
])

const TUNNEL_ROUTES = "tunnel-routes.ts"

const TUNNELED: ReadonlySet<string> = new Set(["routes"])

const BY_FILE: ReadonlyMap<string, ReadonlySet<string>> = new Map([
  [ROOT_ROUTE, ROUTED],
  [APP_LAYOUT, ROUTED],
  [TUNNEL_ROUTES, TUNNELED],
])

const NOTHING: ReadonlySet<string> = new Set()

function toldApart(name: string): boolean {
  return name !== ANYTHING && name !== DEFAULT
}

export function namesToldIn(path: string, text: string): readonly string[] | null {
  const found = exportsIn(parsedAs(path, text))
  if (found.includes(ANYTHING)) return null
  return found.filter(toldApart)
}

function spelledBy(node: ts.Node): string | null {
  if (ts.isImportTypeNode(node)) {
    const said = node.argument
    if (ts.isLiteralTypeNode(said) && ts.isStringLiteral(said.literal)) return said.literal.text
    return null
  }
  if (ts.isCallExpression(node) && node.expression.kind === ts.SyntaxKind.ImportKeyword) {
    const said = node.arguments[0]
    return said !== undefined && ts.isStringLiteral(said) ? said.text : null
  }
  return null
}

function wholeOf(path: string, source: ts.SourceFile, target: string): boolean {
  let every = false
  const walk = (node: ts.Node): undefined => {
    const spelled = spelledBy(node)
    if (spelled !== null && landingOf(path, spelled) === target) every = true
    ts.forEachChild(node, walk)
    return undefined
  }
  walk(source)
  return every
}

export function takenFrom(path: string, text: string, target: string): readonly string[] {
  const source = parsedAs(path, text)
  if (text.includes(WHOLE) && wholeOf(path, source, target)) return [ANYTHING]
  const found: string[] = []
  for (const statement of source.statements) {
    if (!ts.isImportDeclaration(statement)) continue
    const named = statement.moduleSpecifier
    if (!ts.isStringLiteral(named)) continue
    if (landingOf(path, named.text) !== target) continue
    const bound = statement.importClause?.namedBindings
    if (bound !== undefined && ts.isNamespaceImport(bound)) return [ANYTHING]
    if (bound === undefined || !ts.isNamedImports(bound)) continue
    for (const each of bound.elements) found.push((each.propertyName ?? each.name).text)
  }
  return found
}

function tagged(up: ts.Node, node: ts.Identifier): boolean | null {
  if (ts.isJsxSelfClosingElement(up) || ts.isJsxOpeningElement(up) || ts.isJsxClosingElement(up)) {
    return up.tagName !== node || !INTRINSIC.test(node.text)
  }
  return null
}

function namesIt(node: ts.Identifier): boolean {
  const up = node.parent
  if (ts.isImportSpecifier(up) || ts.isExportSpecifier(up)) return false
  if (ts.isQualifiedName(up)) return up.right !== node
  if (ts.isJsxAttribute(up)) return up.name !== node
  const tag = tagged(up, node)
  if (tag !== null) return tag
  if (ts.isShorthandPropertyAssignment(up)) return true
  return !("name" in up) || up.name !== node
}

export function namedWithin(path: string, text: string): ReadonlySet<string> {
  const found = new Set<string>()
  const walk = (node: ts.Node): undefined => {
    if (ts.isIdentifier(node) && namesIt(node)) found.add(node.text)
    ts.forEachChild(node, walk)
    return undefined
  }
  walk(parsedAs(path, text))
  return found
}

function reasonFor(name: string, named: boolean): string {
  if (named) return `exports \`${name}\`, which no other file names — ${PUBLISHED}`
  return `exports \`${name}\`, which nothing names — ${REACHED}`
}

function besideCode(said: Parted, pageType: string): boolean {
  return said.pageType === pageType && said.sections.length > 0
}

function besideProperty(said: Parted, pageType: string, property: string): boolean {
  return said.pageType === pageType && said.sections.length === 1 && said.sections[0] === property
}

function fixedFor(path: string, said: Parted | null): ReadonlySet<string> | null {
  if (said !== null && besideCode(said, ROUTE)) return ROUTED
  return BY_FILE.get(basename(path)) ?? null
}

type Bodied = (at: string) => string | null

function luaNamed(path: string, said: Parted, bodyOf: Bodied): string | null {
  if (said.pageType !== LUALIB || said.sections.length === 0) return null
  const text = bodyOf(`${dirname(path)}/${pageOf(said)}.${HELD}`)
  if (text === null) return null
  const held = loadedFrom(text).value
  return held === null ? null : textAt(held, LUA_EXPORT)
}

function reachedBeside(said: Parted): ReadonlySet<string> | null {
  if (besideCode(said, COMPUTED)) return new Set([WORK])
  if (besideCode(said, GUARD)) return new Set([RUN_GUARD])
  if (besideCode(said, MANIFEST)) return new Set([BUILD_ENV])
  if (besideCode(said, PERFORMANCE)) return new Set([MEASURED])
  if (besideCode(said, MODEL_TEST)) return new Set([ASKING, KEEPING, exportedAs(said.slug)])
  if (besideProperty(said, PAGE_TYPE, GENERATOR)) return GENERATED
  if (besideCode(said, COMMAND) || besideCode(said, CHECK)) return new Set([exportedAs(said.slug)])
  return null
}

export function sparedIn(
  path: string,
  pageTypes: ReadonlySet<string>,
  bodyOf: Bodied
): ReadonlySet<string> {
  const said = partedIn(path)
  const fixed = fixedFor(path, said)
  if (fixed !== null) return fixed
  if (said === null || !pageTypes.has(said.pageType)) return NOTHING
  if (uncommittedNamed(path)) return new Set([nameFor(`${pageOf(said)}.${HELD}`)])
  const lua = luaNamed(path, said, bodyOf)
  if (lua !== null) return new Set([lua])
  const beside = reachedBeside(said)
  if (beside !== null) return beside
  return pageNamed(path, pageTypes) ? new Set([exportedAs(said.slug)]) : NOTHING
}

export type Unreached = {
  readonly name: string
  readonly named: boolean
}

export function unreachedIn(
  path: string,
  text: string,
  spared: ReadonlySet<string>,
  importers: readonly string[],
  bodyOf: (at: string) => string | null
): readonly Unreached[] {
  const told = namesToldIn(path, text)
  if (told === null) return []
  const wanted = told.filter((one) => !spared.has(one))
  if (wanted.length === 0) return []
  const taken = new Set<string>()
  for (const importer of importers) {
    if (importer === path) continue
    const body = bodyOf(importer)
    if (body === null) continue
    for (const name of takenFrom(importer, body, path)) {
      if (name === ANYTHING) return []
      taken.add(name)
    }
  }
  const here = namedWithin(path, text)
  return wanted.filter((one) => !taken.has(one)).map((one) => ({ name: one, named: here.has(one) }))
}

function reasonsFor(
  path: string,
  text: string,
  change: Change,
  shadow: Shadow,
  spared: ReadonlySet<string>
): readonly string[] {
  const found = unreachedIn(path, text, spared, shadow.index.importersOf(path), (at) =>
    textIn(change, at)
  )
  return found.map((one) => reasonFor(one.name, one.named))
}

export function refusalsOver(change: Change, shadow: Shadow): readonly Judged[] {
  const pageTypes = pageTypesFor(shadow)
  const judged: Judged[] = []
  for (const path of change.changed) {
    if (!typeScripted(path)) continue
    const text = textIn(change, path)
    if (text === null) continue
    const spared = sparedIn(path, pageTypes, (at) => textIn(change, at))
    for (const reason of reasonsFor(path, text, change, shadow, spared)) {
      judged.push({ path, reason })
    }
  }
  return judged
}
