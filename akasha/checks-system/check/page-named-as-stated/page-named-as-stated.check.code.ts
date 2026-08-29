import ts from "typescript"
import type { Body } from "../../checking.module.code.ts"
import { HELD_IN_A_FILE, bodyOf, overEachFile } from "../../checking.module.code.ts"
import type { Judged, Leaving } from "../../judging.module.code.ts"

const NAMED =/^(.+)\.([a-z0-9-]+)\.ts$/

const SLUG = "slug"

const PAGE_TYPE_SLUG = "pageTypeSlug"

type Stated = {
  readonly slug: string
  readonly pageTypeSlug: string
}

function textOf(node: ts.Expression | undefined): string | null {
  if (node === undefined) return null
  if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) return node.text
  if (ts.isAsExpression(node)) return textOf(node.expression)
  return null
}

function statedIn(node: ts.ObjectLiteralExpression): Stated | null {
  let slug: string | null = null
  let pageTypeSlug: string | null = null
  for (const one of node.properties) {
    if (!ts.isPropertyAssignment(one)) continue
    const key = ts.isIdentifier(one.name) || ts.isStringLiteral(one.name) ? one.name.text : null
    if (key === SLUG) slug = textOf(one.initializer)
    if (key === PAGE_TYPE_SLUG) pageTypeSlug = textOf(one.initializer)
  }
  if (slug === null || pageTypeSlug === null) return null
  return { slug, pageTypeSlug }
}

function literalOf(node: ts.Expression): ts.ObjectLiteralExpression | null {
  if (ts.isObjectLiteralExpression(node)) return node
  if (ts.isAsExpression(node) || ts.isSatisfiesExpression(node)) return literalOf(node.expression)
  return null
}

export function pageIn(path: string, text: string): Stated | null {
  const source = ts.createSourceFile(path, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS)
  for (const statement of source.statements) {
    if (!ts.isVariableStatement(statement)) continue
    for (const one of statement.declarationList.declarations) {
      if (one.initializer === undefined) continue
      const literal = literalOf(one.initializer)
      if (literal === null) continue
      const stated = statedIn(literal)
      if (stated !== null) return stated
    }
  }
  return null
}

export function reasonsIn(given: Body): readonly string[] {
  const name = given.path.slice(given.path.lastIndexOf("/") + 1)
  const said = NAMED.exec(name)
  if (said === null) return []
  const stem = said[1]
  const suffix = said[2]
  if (stem === undefined || suffix === undefined) return []
  if (HELD_IN_A_FILE.includes(suffix)) return []
  const text = bodyOf(given)
  if (text === null) return []
  const stated = pageIn(given.path, text)
  if (stated === null) return []
  const found: string[] = []
  if (stated.slug !== stem) {
    found.push(
      `the page names itself \`${stated.slug}\`, and its file is named \`${stem}\` — a page's ` +
        "file is named for the slug the page states"
    )
  }
  if (stated.pageTypeSlug !== suffix) {
    found.push(
      `the page states its page type as \`${stated.pageTypeSlug}\`, and its file is named ` +
        `\`${suffix}\` — a page's file is named for the page type the page states`
    )
  }
  return found
}

export function pageNamedAsStated(leaving: Leaving): readonly Judged[] {
  return overEachFile(leaving, reasonsIn)
}
