import { existsSync, readFileSync, readdirSync } from "node:fs"
import { join } from "node:path"

export type Standing = {
  readonly path: string
  readonly id: string
}

const INDEX_AT = ".git/data/index"

const IDENTITY = "identity"

const RELATION = "relation"

const ENDING = ".jsonl"

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
