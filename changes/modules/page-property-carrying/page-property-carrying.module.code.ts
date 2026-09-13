import { pageIn } from "akasha/changes/modules/page-knowing/page-knowing.module.code.ts"
import { holdingIn, type World } from "akasha/changes/modules/shadow/change-shadow.module.code.ts"
import { exportedAs } from "akasha/pages/modules/export-name/page-export-name.module.code.ts"
import { partsOf } from "akasha/pages/modules/file-parts/page-file-parts.module.code.ts"

const PROPERTY_SLUG = "propertySlug"

const PAGE_TYPE = "page-type"

export type Declared = {
  readonly slug: string
  readonly kind: string
  readonly id: string
  readonly path: string
}

export type Carried = {
  readonly path: string
  readonly held: unknown
}

export function carriedUnder(
  world: World,
  types: readonly string[],
  key: string,
  atMost: number | null
): readonly Carried[] {
  const found: Carried[] = []
  const seen = new Set<string>()
  for (const type of types) {
    for (const kind of world.index.kindsUnder(type)) {
      for (const [path, value] of world.index.valuesByPath(kind)) {
        if (atMost !== null && found.length >= atMost) return found
        if (seen.has(path)) continue
        seen.add(path)
        const held = value[key]
        if (held === undefined) continue
        found.push({ path, held })
      }
    }
  }
  return found
}

export function typesDeclaring(world: World, id: string): readonly string[] {
  return world.index
    .declaringOf(id)
    .filter((one) => one.kind === PAGE_TYPE)
    .map((one) => one.slug)
}

function slugOfPage(world: World, path: string): string | null {
  const value = pageIn(world, path)
  const slug = value === null ? null : value[PROPERTY_SLUG]
  return typeof slug === "string" ? slug : null
}

export type Within = {
  readonly key: string
  readonly carrying: readonly string[]
}

export function withinOf(world: World, record: Declared, atMost: number | null): Within | null {
  const slug = slugOfPage(world, record.path)
  if (slug === null) return null
  const key = exportedAs(slug)
  const held = carriedUnder(world, typesDeclaring(world, record.id), key, atMost)
  return { key, carrying: held.map((one) => one.path) }
}

export function filedUnder(world: World, shape: Declared): readonly string[] {
  const slug = slugOfPage(world, shape.path)
  if (slug === null) return []
  const found: string[] = []
  const holds = holdingIn(world)
  for (const one of carriedUnder(world, typesDeclaring(world, shape.id), exportedAs(slug), null)) {
    if (typeof one.held !== "string") continue
    for (const at of partsOf(one.path, slug, one.held, holds)) {
      if (holds(at)) found.push(at)
    }
  }
  return found
}
