import { existsSync, readdirSync, readFileSync } from "node:fs"
import { join } from "node:path"
import { staleFor } from "./index-stamp.module.code.ts"

export type Standing = {
  readonly path: string
  readonly id: string
}

export type Schema = {
  readonly pageTypeSlug: string
  readonly targetPageTypeSlug: string | null
}

const INDEX_AT = ".git/data/index"

const IDENTITY = "identity"

const IMPORT = "import"

const RELATION = "relation"

const SCHEMA = "schema"

const PROPERTY = "page-property"

const ENDING = ".jsonl"

function named(said: unknown): string | null {
  return typeof said === "string" ? said : null
}

function standingIn(at: string): readonly Standing[] {
  if (!existsSync(at)) return []
  const found: Standing[] = []
  for (const line of readFileSync(at, "utf8").split("\n")) {
    if (line === "") continue
    const said = JSON.parse(line) as { readonly path?: unknown; readonly id?: unknown }
    if (typeof said.path === "string" && typeof said.id === "string") {
      found.push({ path: said.path, id: said.id })
    }
  }
  return found
}

export function indexIn(root: string): string {
  return join(root, INDEX_AT)
}

export function standingAt(root: string, pageTypeSlug: string, slug: string): readonly Standing[] {
  return standingIn(join(indexIn(root), IDENTITY, pageTypeSlug, "slug", `${slug}${ENDING}`))
}

export function standingById(root: string, id: string): Standing | null {
  const found = standingIn(join(indexIn(root), IDENTITY, "page", "id", `${id}${ENDING}`))
  return found[0] ?? null
}

export function standingByPath(root: string, path: string): readonly Standing[] {
  return standingIn(join(indexIn(root), IDENTITY, "page", "path", `${path}${ENDING}`))
}

function pathsIn(at: string): readonly string[] {
  if (!existsSync(at)) return []
  const found: string[] = []
  for (const line of readFileSync(at, "utf8").split("\n")) {
    if (line === "") continue
    const said = JSON.parse(line) as { readonly path?: unknown }
    if (typeof said.path === "string") found.push(said.path)
  }
  return found.sort()
}

export function importersOf(root: string, path: string): readonly string[] {
  const why = staleFor(root, indexIn(root))
  if (why !== null) {
    throw new Error(`which files import \`${path}\` could not be answered — ${why}`)
  }
  return pathsIn(join(indexIn(root), IMPORT, "path", `${path}${ENDING}`))
}

function schemaIn(at: string): readonly Schema[] {
  if (!existsSync(at)) return []
  const found: Schema[] = []
  for (const line of readFileSync(at, "utf8").split("\n")) {
    if (line === "") continue
    const said = JSON.parse(line) as Record<string, unknown>
    const pageTypeSlug = named(said["pageTypeSlug"])
    if (pageTypeSlug === null) continue
    found.push({
      pageTypeSlug,
      targetPageTypeSlug: named(said["targetPageTypeSlug"]),
    })
  }
  return found
}

export function schemaOf(root: string, propertySlug: string): Schema | null {
  const found = schemaIn(join(indexIn(root), SCHEMA, PROPERTY, "slug", `${propertySlug}${ENDING}`))
  return found[0] ?? null
}

export function everyOfType(root: string, pageTypeSlug: string): readonly Standing[] {
  const dir = join(indexIn(root), IDENTITY, pageTypeSlug, "slug")
  if (!existsSync(dir)) return []
  const found: Standing[] = []
  for (const name of readdirSync(dir)) {
    if (!name.endsWith(ENDING)) continue
    found.push(...standingIn(join(dir, name)))
  }
  return [...found].sort((one, two) => (one.path < two.path ? -1 : one.path > two.path ? 1 : 0))
}

export function slugsOfType(root: string, pageTypeSlug: string): readonly string[] {
  const dir = join(indexIn(root), IDENTITY, pageTypeSlug, "slug")
  if (!existsSync(dir)) return []
  return readdirSync(dir)
    .filter((one) => one.endsWith(ENDING))
    .map((one) => one.slice(0, -ENDING.length))
    .sort()
}

export function idsNaming(root: string, id: string, propertySlug: string): readonly string[] {
  const dir = join(indexIn(root), RELATION, "page", "id", id, propertySlug)
  if (!existsSync(dir)) return []
  return readdirSync(dir)
    .filter((one) => one.endsWith(ENDING))
    .map((one) => one.slice(0, -ENDING.length))
    .sort()
}

export function everyPage(root: string): readonly Standing[] {
  const dir = join(indexIn(root), IDENTITY, "page", "id")
  if (!existsSync(dir)) return []
  const found: Standing[] = []
  for (const name of readdirSync(dir)) {
    if (!name.endsWith(ENDING)) continue
    found.push(...standingIn(join(dir, name)))
  }
  return [...found].sort((one, two) => (one.path < two.path ? -1 : one.path > two.path ? 1 : 0))
}

function underneath(at: string, said: string, found: string[]): void {
  for (const one of readdirSync(at, { withFileTypes: true })) {
    const named = `${said}${one.name}`
    if (one.isDirectory()) underneath(join(at, one.name), `${named}/`, found)
    else if (one.name.endsWith(ENDING)) found.push(named.slice(0, -ENDING.length))
  }
}

export function everyPath(root: string): readonly string[] {
  const dir = join(indexIn(root), IDENTITY, "page", "path")
  if (!existsSync(dir)) return []
  const found: string[] = []
  underneath(dir, "", found)
  return found.sort()
}
