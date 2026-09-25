import { defaultReasonsIn } from "akasha/check/code/pages/page-matches-its-type/modules/default-reasons/default-reasons.module.code.ts"
import { entryReasonsIn } from "akasha/check/code/pages/page-matches-its-type/modules/entry-reasons/entry-reasons.module.code.ts"
import { reasonsIn } from "akasha/check/code/pages/page-matches-its-type/modules/page-reasons/page-reasons.module.code.ts"
import {
  type Commit,
  type Paged,
  pageOfRow,
} from "akasha/check/modules/audit-commit/audit-commit.module.code.ts"
import { textIn } from "akasha/check/modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"
import type { Answering } from "akasha/page/index/modules/answering/index-answering.module.code.ts"
import { waitingProperties } from "akasha/page/index/modules/generated-properties/generated-properties.module.code.ts"
import type { Change } from "akasha/page/modules/change/change.module.code.ts"
import { pageNamed } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import type { Shadow } from "akasha/page/modules/shadow/shadow.module.code.ts"
import { valueIn } from "akasha/page/modules/value/page-value.module.code.ts"
import {
  slugAt,
  type Value,
} from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import {
  type Formatting,
  matchingIn,
} from "akasha/page/name-format/modules/format-reaching/format-reaching.module.code.ts"
import type { Carried } from "akasha/page/type/modules/declared-properties/declared-properties.module.code.ts"
import ts from "typescript"

const PAGE_TYPE = "page-type"

const PAGE_FILE = "page.ts"

const NOTHING: ReadonlySet<string> = new Set()

export const STATES_NO_PAGE_TYPE =
  "states no `type`, and what a page carries is read from the page type it states"

export const HOLDS_MORE_THAN_DATA =
  "is not one exported object of plain data, and a page file declares its value and runs no code"

function typeImport(statement: ts.ImportDeclaration): boolean {
  const clause = statement.importClause
  if (clause === undefined) return false
  if (clause.isTypeOnly) return true
  const bound = clause.namedBindings
  if (clause.name !== undefined || bound === undefined || !ts.isNamedImports(bound)) return false
  return bound.elements.every((one) => one.isTypeOnly)
}

function exportedValue(statement: ts.Statement): boolean {
  if (!ts.isVariableStatement(statement)) return false
  return statement.modifiers?.some((one) => one.kind === ts.SyntaxKind.ExportKeyword) === true
}

function holdsOnlyItsValue(text: string): boolean {
  const source = ts.createSourceFile(PAGE_FILE, text, ts.ScriptTarget.Latest, false)
  let values = 0
  for (const statement of source.statements) {
    if (ts.isImportDeclaration(statement) && typeImport(statement)) continue
    if (ts.isTypeAliasDeclaration(statement) || ts.isInterfaceDeclaration(statement)) continue
    if (!exportedValue(statement)) return false
    values += 1
  }
  return values === 1
}

function pagesHeldOver(index: Answering): Answering {
  const held = new Map<string, Value | null>()
  const pageAt = (pageTypeSlug: string, slug: string): Value | null => {
    const at = `${pageTypeSlug}/${slug}`
    const found = held.get(at)
    if (found !== undefined) return found
    const made = index.pageAt(pageTypeSlug, slug)
    held.set(at, made)
    return made
  }
  return { ...index, pageAt }
}

function carryingIn(index: Answering): (pageTypeSlug: string) => readonly Carried[] {
  const held = new Map<string, readonly Carried[]>()
  return (pageTypeSlug) => {
    const found = held.get(pageTypeSlug)
    if (found !== undefined) return found
    const said = index.propertiesIfNamed(pageTypeSlug) ?? []
    held.set(pageTypeSlug, said)
    return said
  }
}

type Judging = {
  readonly over: Paged
  readonly carriedBy: (pageTypeSlug: string) => readonly Carried[]
  readonly formatting: Formatting
  readonly beside: (at: string) => string | null
}

function reasonsAt(
  judging: Judging,
  path: string,
  text: string,
  excused: ReadonlySet<string>
): readonly string[] {
  const { over, carriedBy, formatting, beside } = judging
  const value = valueIn(text)
  if (value === null || !holdsOnlyItsValue(text)) return [HOLDS_MORE_THAN_DATA]
  const pageTypeSlug = slugAt(value, "type")
  if (pageTypeSlug === null) return [STATES_NO_PAGE_TYPE]
  const declared = carriedBy(pageTypeSlug)
  if (declared.length === 0) return []
  const named = `${PAGE_TYPE}/${pageTypeSlug}`
  return [
    ...reasonsIn(value, declared, over, named, formatting, excused),
    ...entryReasonsIn(value, declared, over, path, beside, formatting),
    ...defaultReasonsIn(value, over.index),
  ]
}

export function refusalsIn(commit: Commit): readonly Judged[] {
  const over: Paged = { ...commit, index: pagesHeldOver(commit.index) }
  const pageTypes = over.index.pageTypesIn()
  const judging: Judging = {
    over,
    carriedBy: carryingIn(over.index),
    formatting: matchingIn(commit.root, over.index),
    beside: commit.read,
  }
  const judged: Judged[] = []
  const walked = new Set<string>()
  for (const one of commit.paths) {
    const path = pageNamed(one, pageTypes) ? one : pageOfRow(one, over)
    if (path === null || walked.has(path)) continue
    walked.add(path)
    const text = commit.read(path)
    if (text === null) continue
    for (const reason of reasonsAt(judging, path, text, NOTHING)) judged.push({ path, reason })
  }
  return judged
}

export function refusalsOver(change: Change, shadow: Shadow): readonly Judged[] {
  const over: Shadow = { ...shadow, index: pagesHeldOver(shadow.index) }
  const pageTypes = over.index.pageTypesIn()
  let generated: ReadonlySet<string> | null = null
  const generatedNow = (): ReadonlySet<string> => {
    if (generated !== null) return generated
    generated = waitingProperties(over)
    return generated
  }
  const judging: Judging = {
    over,
    carriedBy: carryingIn(over.index),
    formatting: matchingIn(change.root, over.index, over.codeAt),
    beside: (at) => textIn(change, at),
  }
  const judged: Judged[] = []
  const walked = new Set<string>()
  for (const one of change.changed) {
    const path = pageNamed(one, pageTypes) ? one : pageOfRow(one, over)
    if (path === null || walked.has(path)) continue
    walked.add(path)
    const text = textIn(change, path)
    if (text === null) continue
    const excused = change.before(path) !== null ? NOTHING : generatedNow()
    for (const reason of reasonsAt(judging, path, text, excused)) judged.push({ path, reason })
  }
  return judged
}
