import { appendFileSync, existsSync, mkdirSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { indexIdentity } from "akasha/pages/indexes/identity/index-identity.index.ts"
import { keepBuilt } from "akasha/pages/indexes/modules/keeping/index-keeping.module.code.ts"
import { indexIn } from "akasha/pages/indexes/modules/surface/index-surface.module.code.ts"
import { indexValue } from "akasha/pages/indexes/value/index-value.index.ts"
import { exportedAs } from "akasha/pages/modules/export-name/page-export-name.module.code.ts"

const ENDING = ".jsonl"

const PAGE = "page"

const PAGE_TYPE = "page-type"

const NO_SCOPE = ""

const ID = "id"

const SLUG = "slug"

const HELD = "held"

type Carried = {
  readonly path?: unknown
  readonly value?: Readonly<Record<string, unknown>>
}

function bodyOf(lines: readonly unknown[]): string {
  return lines.map((one) => `${JSON.stringify(one)}\n`).join("")
}

function written(root: string, at: string, lines: readonly unknown[]): undefined {
  const path = join(indexIn(root), `${at}${ENDING}`)
  mkdirSync(dirname(path), { recursive: true })
  writeFileSync(path, bodyOf(lines))
  keepBuilt(indexIn(root))
}

function added(root: string, at: string, lines: readonly unknown[]): undefined {
  const path = join(indexIn(root), `${at}${ENDING}`)
  mkdirSync(dirname(path), { recursive: true })
  appendFileSync(path, bodyOf(lines))
  keepBuilt(indexIn(root))
}

function identityFiled(
  root: string,
  uniqueKind: string,
  scope: string,
  propertySlug: string,
  said: string,
  lines: readonly unknown[]
): undefined {
  written(root, join(indexIdentity.name, uniqueKind, scope, propertySlug, said), lines)
}

export function listedFiled(
  root: string,
  pageTypeSlug: string,
  slug: string,
  lines: readonly unknown[]
): undefined {
  identityFiled(root, PAGE_TYPE, pageTypeSlug, SLUG, slug, lines)
}

export function idFiled(root: string, id: string, lines: readonly unknown[]): undefined {
  identityFiled(root, PAGE, NO_SCOPE, ID, id, lines)
}

function namedIn(value: Readonly<Record<string, unknown>>): string {
  const slug = value[SLUG]
  return typeof slug === "string" ? exportedAs(slug) : HELD
}

function bodyWritten(
  root: string,
  path: string,
  value: Readonly<Record<string, unknown>>
): undefined {
  const at = join(root, path)
  if (existsSync(at)) return
  mkdirSync(dirname(at), { recursive: true })
  writeFileSync(at, `export const ${namedIn(value)} = ${JSON.stringify(value)}\n`)
}

function pagedIn(one: Carried): string | null {
  const value = one.value
  if (typeof one.path !== "string" || value === undefined) return null
  return typeof value[ID] === "string" ? one.path : null
}

export function valueAlsoFiled(
  root: string,
  pageTypeSlug: string,
  lines: readonly unknown[]
): undefined {
  added(root, join(indexValue.name, pageTypeSlug), lines)
  for (const one of lines as readonly Carried[]) {
    const path = pagedIn(one)
    const value = one.value
    if (path !== null && value !== undefined) bodyWritten(root, path, value)
  }
}
