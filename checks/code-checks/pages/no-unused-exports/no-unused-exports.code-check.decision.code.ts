import { exportsIn } from "akasha/checks/code-checks/pages/browser-code-reads-the-environment-by-a-name/browser-code-reads-the-environment-by-a-name.code-check.decision.code.ts"
import {
  pageTypesFor,
  textIn,
} from "akasha/checks/modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "akasha/checks/modules/judging/judging.module.code.ts"
import { typeScripted } from "akasha/code/file-kind/file-kind.module.code.ts"
import { parsedAs } from "akasha/code/source/code-source.module.code.ts"
import { landingOf } from "akasha/code/specifier/code-specifier.module.code.ts"
import type { Change } from "akasha/pages/change/change.module.code.ts"
import { exportedAs } from "akasha/pages/export-name/page-export-name.module.code.ts"
import { pageNamed, partedIn } from "akasha/pages/file-name/page-file-name.module.code.ts"
import type { Shadow } from "akasha/pages/shadow/shadow.module.code.ts"
import ts from "typescript"

const PUBLISHED = "a value only its own file names is published for nothing"

const REACHED = "a value nothing names is code nothing runs"

const ANYTHING = "*"

const DEFAULT = "default"

function toldApart(name: string): boolean {
  return name !== ANYTHING && name !== DEFAULT
}

export function namesToldIn(path: string, text: string): readonly string[] | null {
  const found = exportsIn(parsedAs(path, text))
  if (found.includes(ANYTHING)) return null
  return found.filter(toldApart)
}

export function takenFrom(path: string, text: string, target: string): readonly string[] {
  const found: string[] = []
  for (const statement of parsedAs(path, text).statements) {
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

function namesIt(node: ts.Identifier): boolean {
  const up = node.parent
  if (ts.isImportSpecifier(up) || ts.isExportSpecifier(up)) return false
  if (ts.isQualifiedName(up)) return up.right !== node
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

export function reasonFor(name: string, named: boolean): string {
  if (named) return `exports \`${name}\`, which no other file names — ${PUBLISHED}`
  return `exports \`${name}\`, which nothing names — ${REACHED}`
}

export function sparedIn(path: string, pageTypes: ReadonlySet<string>): string | null {
  if (!pageNamed(path, pageTypes)) return null
  const said = partedIn(path)
  return said === null ? null : exportedAs(said.slug)
}

export function reasonsFor(
  path: string,
  text: string,
  change: Change,
  shadow: Shadow,
  spared: string | null
): readonly string[] {
  const told = namesToldIn(path, text)
  if (told === null) return []
  const wanted = told.filter((one) => one !== spared)
  if (wanted.length === 0) return []
  const taken = new Set<string>()
  for (const importer of shadow.index.importersOf(path)) {
    if (importer === path) continue
    const body = textIn(change, importer)
    if (body === null) continue
    for (const name of takenFrom(importer, body, path)) {
      if (name === ANYTHING) return []
      taken.add(name)
    }
  }
  const here = namedWithin(path, text)
  return wanted.filter((one) => !taken.has(one)).map((one) => reasonFor(one, here.has(one)))
}

export function refusalsOver(change: Change, shadow: Shadow): readonly Judged[] {
  const pageTypes = pageTypesFor(shadow)
  const judged: Judged[] = []
  for (const path of change.changed) {
    if (!typeScripted(path)) continue
    const text = textIn(change, path)
    if (text === null) continue
    const spared = sparedIn(path, pageTypes)
    for (const reason of reasonsFor(path, text, change, shadow, spared)) {
      judged.push({ path, reason })
    }
  }
  return judged
}
