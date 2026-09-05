import { lineOf, parsedAs } from "@akasha/code-system/code-source"
import { textAt } from "@akasha/pages-system/page-value"
import type { Shadow } from "@akasha/pages-system/shadow"
import ts from "typescript"
import {
  judgingEach,
  overEachText,
  TEXTS,
} from "../../../modules/change-walking/change-walking.module.code.ts"

const OS = new Set(["node:os", "os"])

const TMPDIR = "tmpdir"

const IN_TMP = /^\/tmp(\/|$)/

const PAGE_TYPE = "page-type"

const TYPE_SLUG = "pageTypeSlug"

const ALLOWS = "allowsTmpPaths"

function specifierOf(node: ts.ImportDeclaration): string | null {
  const held = node.moduleSpecifier
  return ts.isStringLiteral(held) ? held.text : null
}

function literalIn(node: ts.Node): string | null {
  if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) return node.text
  if (ts.isTemplateHead(node)) return node.text
  return null
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

export function reasonsFor(at: string, text: string): readonly string[] {
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

function found(path: string, text: string): readonly string[] {
  return reasonsFor(path, text)
}

export const reasonsIn = overEachText(found)

function allowedIn(path: string, shadow: Shadow): boolean {
  const listed = shadow.index.listedByPath(path)[0]
  if (listed === undefined) return false
  const page = shadow.pageOf(listed.path)
  if (page === null) return false
  const slug = textAt(page, TYPE_SLUG)
  if (slug === null) return false
  return shadow.index.pageAt(PAGE_TYPE, slug)?.[ALLOWS] === true
}

export const noTmp = judgingEach(TEXTS, (given, shadow) => {
  const said = found(given.path, given.text)
  if (said.length === 0 || allowedIn(given.path, shadow)) return []
  return said
})
