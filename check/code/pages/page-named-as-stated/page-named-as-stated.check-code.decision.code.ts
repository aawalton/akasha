import type { Body } from "akasha/check/modules/change-walking/change-walking.module.code.ts"
import {
  bodyOf,
  overEachFile,
} from "akasha/check/modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"
import {
  literalOf,
  skimmedAs,
} from "akasha/code/reading/modules/code-source/code-source.module.code.ts"
import type { Change } from "akasha/page/modules/change/change.module.code.ts"
import { exportedAs } from "akasha/page/modules/export-name/page-export-name.module.code.ts"
import type { Parted } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import { partedIn, sectionedIn } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import type { Shadow } from "akasha/page/modules/shadow/shadow.module.code.ts"
import { slugOf } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import ts from "typescript"

const SLUG = "slug"

const PAGE_TYPE = "type"

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
    if (key === PAGE_TYPE) pageTypeSlug = textOf(one.initializer)
  }
  if (slug === null || pageTypeSlug === null) return null
  return { slug, pageTypeSlug }
}

export function pagesIn(path: string, text: string): readonly Stated[] {
  const source = skimmedAs(path, text)
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
  return rest.map((one) => `\`${slugOf(one.pageTypeSlug)}/${one.slug}\``).join(", ")
}

function besideAPage(said: Parted, heldInAFile: ReadonlySet<string>): boolean {
  const beside = sectionedIn(said, heldInAFile)
  return beside === null || !heldInAFile.has(beside.propertySlug)
}

export function namedForAPage(path: string, heldInAFile: ReadonlySet<string>): boolean {
  const said = partedIn(path)
  return said !== null && besideAPage(said, heldInAFile)
}

const OUTER = /^(?! |$).*$/gm

const OPENED_AS = /^export const ([A-Za-z_$][A-Za-z0-9_$]*) = \{$/

const SHUT_AS = /^\} as const satisfies [A-Za-z_$][A-Za-z0-9_$.]*$/

const IMPORTED = /^import /

const SLUG_SAID = /^ {2}slug: "([^"\n\\]*)",$/m

const PAGE_TYPE_SAID = /^ {2}type: "([^"\n\\]*)",$/m

const SLUG_KEY = `${SLUG}:`

const PAGE_TYPE_KEY = `${PAGE_TYPE}:`

function countOf(text: string, one: string): number {
  let held = 0
  let at = text.indexOf(one)
  while (at !== -1) {
    held += 1
    at = text.indexOf(one, at + one.length)
  }
  return held
}

function pageTypeSaidIn(text: string): string | null {
  if (countOf(text, PAGE_TYPE_KEY) !== 1) return null
  return PAGE_TYPE_SAID.exec(text)?.[1] ?? null
}

export function namedPlainly(stem: string, suffix: string, text: string): boolean {
  const outer = [...text.matchAll(OUTER)]
  const shut = outer[outer.length - 1]
  const opened = outer[outer.length - 2]
  if (shut === undefined || opened === undefined) return false
  if (shut.index + shut[0].length !== text.length - 1 || !SHUT_AS.test(shut[0])) return false
  if (OPENED_AS.exec(opened[0])?.[1] !== exportedAs(stem)) return false
  for (const one of outer.slice(0, -2)) {
    if (!IMPORTED.test(one[0])) return false
  }
  if (countOf(text, SLUG_KEY) !== 1 || SLUG_SAID.exec(text)?.[1] !== stem) return false
  const said = pageTypeSaidIn(text)
  return said !== null && slugOf(said) === suffix
}

export function reasonsFor(
  path: string,
  body: string,
  heldInAFile: ReadonlySet<string>
): readonly string[] {
  const said = partedIn(path)
  if (said === null || !besideAPage(said, heldInAFile)) return []
  const stem = said.slug
  const suffix = said.pageType
  if (namedPlainly(stem, suffix, body)) return []
  const stated = pagesIn(path, body)
  const first = stated[0]
  if (first === undefined) return []
  const found: string[] = []
  if (first.slug !== stem) {
    found.push(
      `the page names itself \`${first.slug}\`, and its file is named \`${stem}\` — a page's ` +
        "file is named for the slug the page states"
    )
  }
  if (slugOf(first.pageTypeSlug) !== suffix) {
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

export function reasonsIn(given: Body, heldInAFile: ReadonlySet<string>): readonly string[] {
  if (!namedForAPage(given.path, heldInAFile)) return []
  return reasonsFor(given.path, bodyOf(given), heldInAFile)
}

export function refusalsOver(change: Change, shadow: Shadow): readonly Judged[] {
  const heldInAFile = new Set(shadow.index.fileKeysAt().keys())
  return overEachFile(
    change,
    (path) => namedForAPage(path, heldInAFile),
    (given) => reasonsIn(given, heldInAFile)
  )
}
