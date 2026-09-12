import { appendFileSync, existsSync, mkdirSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { indexIdentity } from "akasha/pages/indexes/identity/index-identity.index.ts"
import { indexIn } from "akasha/pages/indexes/surface/index-surface.module.code.ts"
import { indexValue } from "akasha/pages/indexes/value/index-value.index.ts"

const ENDING = ".jsonl"

const PAGE = "page"

const PAGE_TYPE = "page-type"

const NO_SCOPE = ""

const ID = "id"

const SLUG = "slug"

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
}

function added(root: string, at: string, lines: readonly unknown[]): undefined {
  const path = join(indexIn(root), `${at}${ENDING}`)
  mkdirSync(dirname(path), { recursive: true })
  appendFileSync(path, bodyOf(lines))
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

function bodyWritten(root: string, path: string, value: unknown): undefined {
  const at = join(root, path)
  if (existsSync(at)) return
  mkdirSync(dirname(at), { recursive: true })
  writeFileSync(at, `export const held = ${JSON.stringify(value)}\n`)
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
    if (path !== null) bodyWritten(root, path, one.value)
  }
}

export function lineFiled(root: string, at: string, line: string): undefined {
  const path = join(root, at)
  mkdirSync(dirname(path), { recursive: true })
  writeFileSync(path, `${line}\n`)
}
