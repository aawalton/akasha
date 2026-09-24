import { dirname, join } from "node:path"
import type { Paged } from "akasha/check/modules/audit-commit/audit-commit.module.code.ts"
import {
  lineOf,
  literalIn,
  parsedAs,
} from "akasha/code/reading/modules/code-source/code-source.module.code.ts"
import { pageOf, partedIn } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import { slugAt } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import ts from "typescript"

const OS = new Set(["node:os", "os"])

const TMPDIR = "tmpdir"

const IN_TMP = /^\/tmp(\/|$)/

const PAGE_TYPE = "page-type"

const TYPE = "type"

const ALLOWS = "allowsTmpPaths"

const TS = ".ts"

function specifierOf(node: ts.ImportDeclaration): string | null {
  const held = node.moduleSpecifier
  return ts.isStringLiteral(held) ? held.text : null
}

type Taken = {
  readonly bound: ReadonlySet<string>
  readonly said: readonly string[]
}

function takenIn(source: ts.SourceFile): Taken {
  const bound = new Set<string>()
  const said: string[] = []
  for (const one of source.statements) {
    if (!ts.isImportDeclaration(one)) continue
    const named = specifierOf(one)
    if (named === null || !OS.has(named)) continue
    const clause = one.importClause
    if (clause === undefined) continue
    if (clause.name !== undefined) bound.add(clause.name.text)
    const held = clause.namedBindings
    if (held === undefined) continue
    if (ts.isNamespaceImport(held)) {
      bound.add(held.name.text)
      continue
    }
    for (const element of held.elements) {
      if ((element.propertyName ?? element.name).text !== TMPDIR) continue
      said.push(
        `line ${lineOf(source, element)} takes \`${TMPDIR}\` from \`${named}\`, and here that answers /tmp`
      )
    }
  }
  return { bound, said }
}

function reached(node: ts.Node, bound: ReadonlySet<string>): string | null {
  if (!ts.isPropertyAccessExpression(node)) return null
  if (node.name.text !== TMPDIR) return null
  if (!ts.isIdentifier(node.expression)) return null
  return bound.has(node.expression.text) ? node.expression.text : null
}

function reasonsFor(at: string, text: string): readonly string[] {
  const source = parsedAs(at, text)
  const taken = takenIn(source)
  const said: string[] = []
  const walk = (node: ts.Node): undefined => {
    const value = literalIn(node)
    if (value !== null && IN_TMP.test(value)) {
      said.push(`line ${lineOf(source, node)} spells a path in /tmp, where no scratch of ours sits`)
    }
    const named = reached(node, taken.bound)
    if (named !== null) {
      said.push(
        `line ${lineOf(source, node)} reaches \`${named}.${TMPDIR}\`, and here that answers /tmp`
      )
    }
    ts.forEachChild(node, walk)
  }
  ts.forEachChild(source, walk)
  return [...taken.said, ...said]
}

export function allowedIn(path: string, paged: Paged): boolean {
  const said = partedIn(path)
  if (said === null) return false
  const page = paged.pageOf(join(dirname(path), `${pageOf(said)}${TS}`))
  if (page === null) return false
  if (page[ALLOWS] === true) return true
  const slug = slugAt(page, TYPE)
  if (slug === null) return false
  return paged.index.pageAt(PAGE_TYPE, slug)?.[ALLOWS] === true
}

export function judgedIn(path: string, text: string, paged: Paged): readonly string[] {
  const said = reasonsFor(path, text)
  if (said.length === 0 || allowedIn(path, paged)) return []
  return said
}
