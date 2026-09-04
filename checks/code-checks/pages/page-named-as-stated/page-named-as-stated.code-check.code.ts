import { literalOf, parsedAs } from "@akasha/code-system/code-source"
import type { Change } from "@akasha/pages-system/change"
import { exportedAs } from "@akasha/pages-system/page-export-name"
import { partedIn, sectionedIn } from "@akasha/pages-system/page-file-name"
import type { Shadow } from "@akasha/pages-system/shadow"
import ts from "typescript"
import type { Body } from "../../../modules/change-walking/change-walking.module.code.ts"
import {
  bodyOf,
  FILES,
  input,
  overEachFile,
} from "../../../modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "../../../modules/judging/judging.module.code.ts"

const SLUG = "slug"

const PAGE_TYPE_SLUG = "pageTypeSlug"

type Said = {
  readonly slug: string
  readonly pageTypeSlug: string
}

type Stated = Said & {
  readonly named: string | null
}

function textOf(node: ts.Expression | undefined): string | null {
  if (node === undefined) return null
  if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) return node.text
  if (ts.isAsExpression(node)) return textOf(node.expression)
  return null
}

function statedIn(node: ts.ObjectLiteralExpression): Said | null {
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

export function pagesIn(path: string, text: string): readonly Stated[] {
  const source = parsedAs(path, text)
  const found: Stated[] = []
  for (const statement of source.statements) {
    if (!ts.isVariableStatement(statement)) continue
    for (const one of statement.declarationList.declarations) {
      if (one.initializer === undefined) continue
      const literal = literalOf(one.initializer)
      if (literal === null) continue
      const said = statedIn(literal)
      if (said === null) continue
      found.push({ ...said, named: ts.isIdentifier(one.name) ? one.name.text : null })
    }
  }
  return found
}

export function pageIn(path: string, text: string): Stated | null {
  return pagesIn(path, text)[0] ?? null
}

function extrasSaid(rest: readonly Stated[]): string {
  return rest.map((one) => `\`${one.pageTypeSlug}/${one.slug}\``).join(", ")
}

export function reasonsIn(
  given: Body,
  heldInAFile: ReadonlyMap<string, string | null>
): readonly string[] {
  const said = partedIn(given.path)
  if (said === null) return []
  const beside = sectionedIn(said)
  if (beside !== null && heldInAFile.has(beside.propertySlug)) return []
  const stem = said.slug
  const suffix = said.pageType
  const body = bodyOf(given)
  const stated = pagesIn(given.path, body)
  const first = stated[0]
  if (first === undefined) return []
  const found: string[] = []
  if (first.slug !== stem) {
    found.push(
      `the page names itself \`${first.slug}\`, and its file is named \`${stem}\` — a page's ` +
        "file is named for the slug the page states"
    )
  }
  if (first.pageTypeSlug !== suffix) {
    found.push(
      `the page states its page type as \`${first.pageTypeSlug}\`, and its file is named ` +
        `\`${suffix}\` — a page's file is named for the page type the page states`
    )
  }
  const wanted = exportedAs(first.slug)
  if (first.named !== wanted) {
    const bound = first.named === null ? "bound to no name" : `bound as \`${first.named}\``
    found.push(
      `the page is ${bound}, and the slug it states is named \`${wanted}\` — a page's exported ` +
        "object is named for the slug the page states"
    )
  }
  const rest = stated.slice(1)
  if (rest.length > 0) {
    found.push(
      `the file states ${stated.length} pages, and past the first it states ${extrasSaid(rest)} ` +
        "— a page's file states one page, and a page stated past the first is filed by nothing " +
        "and named by nothing"
    )
  }
  return found
}

function refusalsIn(change: Change, shadow: Shadow): readonly Judged[] {
  const heldInAFile = shadow.index.fileKeysAt()
  return overEachFile(change, (given) => reasonsIn(given, heldInAFile))
}

export const pageNamedAsStated = input(FILES, refusalsIn)
