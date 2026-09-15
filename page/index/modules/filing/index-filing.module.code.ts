import { appendFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { indexEdge } from "akasha/page/index/edge/index-edge.index.ts"
import { indexIdentity } from "akasha/page/index/identity/index-identity.index.ts"
import { keepBuilt } from "akasha/page/index/modules/keeping/index-keeping.module.code.ts"
import { indexIn } from "akasha/page/index/modules/surface/index-surface.module.code.ts"
import { indexValue } from "akasha/page/index/value/index-value.index.ts"
import { exportedAs } from "akasha/page/modules/export-name/page-export-name.module.code.ts"
import { partedIn } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import { slugsIn } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"

const ENDING = ".jsonl"

const EXTENDS = "extends"

const EXTENDS_TYPE = "extends-type"

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
  return one.path
}

function idFor(path: string, value: Readonly<Record<string, unknown>>): string {
  const said = value[ID]
  if (typeof said === "string") return said
  const held = Bun.hash(path).toString(16).padStart(16, "0").slice(-12)
  return `01a00000-0000-7000-8000-${held}`
}

function onceWritten(root: string, at: string, lines: readonly unknown[]): undefined {
  const path = join(indexIn(root), `${at}${ENDING}`)
  if (existsSync(path)) return
  mkdirSync(dirname(path), { recursive: true })
  writeFileSync(path, bodyOf(lines))
  keepBuilt(indexIn(root))
}

function slugFor(path: string, value: Readonly<Record<string, unknown>>): string | null {
  const said = value[SLUG]
  if (typeof said === "string") return said
  return partedIn(path)?.slug ?? null
}

function listedAlso(
  root: string,
  pageTypeSlug: string,
  path: string,
  value: Readonly<Record<string, unknown>>
): undefined {
  const id = idFor(path, value)
  const slug = slugFor(path, value)
  if (slug === null) return
  onceWritten(root, join(indexIdentity.name, PAGE_TYPE, pageTypeSlug, SLUG, slug), [{ path, id }])
  onceWritten(root, join(indexIdentity.name, PAGE, NO_SCOPE, ID, id), [{ path, id }])
}

function idCarrying(root: string, pageTypeSlug: string, slug: string): string | null {
  const path = join(
    indexIn(root),
    indexIdentity.name,
    PAGE_TYPE,
    pageTypeSlug,
    SLUG,
    `${slug}${ENDING}`
  )
  if (!existsSync(path)) return null
  for (const line of readFileSync(path, "utf8").split("\n")) {
    if (line.trim() === "") continue
    try {
      const said = JSON.parse(line) as Record<string, unknown>
      const id = said[ID]
      if (typeof id === "string") return id
    } catch {}
  }
  return null
}

function edgedAlso(
  root: string,
  pageTypeSlug: string,
  path: string,
  value: Readonly<Record<string, unknown>>
): undefined {
  if (pageTypeSlug !== PAGE_TYPE) return
  const id = idFor(path, value)
  for (const said of slugsIn(value[EXTENDS])) {
    const above = idCarrying(root, PAGE_TYPE, said)
    if (above === null) continue
    onceWritten(root, join(indexEdge.name, PAGE, ID, above, EXTENDS_TYPE, id), [{ path }])
  }
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
    if (path === null || value === undefined) continue
    bodyWritten(root, path, value)
    listedAlso(root, pageTypeSlug, path, value)
    edgedAlso(root, pageTypeSlug, path, value)
  }
}
