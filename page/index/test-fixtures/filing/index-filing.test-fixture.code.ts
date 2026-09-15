import { appendFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { indexIn } from "akasha/page/index/modules/surface/index-surface.module.code.ts"
import { exportedAs } from "akasha/page/modules/export-name/page-export-name.module.code.ts"
import { partedIn } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import { shapesFiledAt } from "akasha/page/type/page-property/modules/property-shape/property-shape.module.code.ts"

const ENDING = ".jsonl"

const PAGE = "page"

const PAGE_TYPE = "page-type"

const NO_SCOPE = ""

const ID = "id"

const SLUG = "slug"

const AT_PATH = "path"

const HELD = "held"

type Carried = {
  readonly path?: unknown
  readonly value?: Readonly<Record<string, unknown>>
}

type Writing = (path: string, body: string) => void

function bodyOf(lines: readonly unknown[]): string {
  return lines.map((one) => `${JSON.stringify(one)}\n`).join("")
}

function filed(root: string, at: string, lines: readonly unknown[], writing: Writing): undefined {
  const path = join(indexIn(root), `${at}${ENDING}`)
  mkdirSync(dirname(path), { recursive: true })
  writing(path, bodyOf(lines))
}

function written(root: string, at: string, lines: readonly unknown[]): undefined {
  filed(root, at, lines, writeFileSync)
}

function identityFiled(
  root: string,
  uniqueKind: string,
  scope: string,
  propertySlug: string,
  said: string,
  lines: readonly unknown[]
): undefined {
  written(root, join(uniqueKind, scope, propertySlug, said), lines)
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
  if (existsSync(join(indexIn(root), `${at}${ENDING}`))) return
  written(root, at, lines)
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
  onceWritten(root, join(PAGE_TYPE, pageTypeSlug, SLUG, slug), [{ path, id }])
  onceWritten(root, join(PAGE, NO_SCOPE, ID, id), [{ path, id }])
}

export function valueAlsoFiled(
  root: string,
  pageTypeSlug: string,
  lines: readonly unknown[]
): undefined {
  for (const one of lines as readonly Carried[]) {
    const path = pagedIn(one)
    const value = one.value
    if (path === null || value === undefined) continue
    bodyWritten(root, path, value)
    listedAlso(root, pageTypeSlug, path, value)
  }
}

function pathCarrying(root: string, pageTypeSlug: string, slug: string): string | null {
  const path = join(indexIn(root), PAGE_TYPE, pageTypeSlug, SLUG, `${slug}${ENDING}`)
  if (!existsSync(path)) return null
  for (const line of readFileSync(path, "utf8").split("\n")) {
    if (line.trim() === "") continue
    try {
      const said = JSON.parse(line) as Record<string, unknown>
      const at = said[AT_PATH]
      if (typeof at === "string") return at
    } catch {}
  }
  return null
}

export function shapeAlsoFiled(
  root: string,
  pageTypeSlug: string,
  lines: readonly unknown[]
): undefined {
  const page = pathCarrying(root, PAGE_TYPE, pageTypeSlug)
  const beside = page === null ? null : shapesFiledAt(page)
  if (beside === null) return
  const to = join(root, beside)
  mkdirSync(dirname(to), { recursive: true })
  appendFileSync(to, bodyOf(lines))
}

export function lineFiled(root: string, at: string, line: string): undefined {
  const path = join(root, at)
  mkdirSync(dirname(path), { recursive: true })
  writeFileSync(path, `${line}\n`)
}
