import type { WorldTreeRow } from "akasha/alan/harness/code-editor/data-interface/pages/world-tree/world-tree.code-editor-data-interface.code.ts"
import {
  slugAt,
  textIn,
  type Value,
} from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import { buildPageHref } from "akasha/page/url/modules/page-href/page-href.module.code.ts"
import { toPageTypeSlug } from "akasha/page/url/modules/page-type-slug/page-type-slug.module.code.ts"

const SITE = "https://alanwalton.com"

const WORLD = "world"

const TOP = "worlds"

export type Paged = {
  readonly pageTypeSlug: string
  readonly at: string | null
  readonly value: Value
}

type WorldTree = {
  readonly roots: readonly WorldTreeRow[]
  readonly unreached: readonly string[]
}

function byLabel(one: WorldTreeRow, two: WorldTreeRow): number {
  return one.label.localeCompare(two.label)
}

function rowOf(one: Paged, children: readonly WorldTreeRow[]): WorldTreeRow | null {
  const id = textIn(one.value, "id")
  if (id === null) return null
  const slug = textIn(one.value, "slug")
  const title = textIn(one.value, "title")
  const href = buildPageHref({
    pageTypeSlug: toPageTypeSlug(one.pageTypeSlug),
    slug,
    fallbackSlugSource: title,
    id,
  })
  return {
    key: id,
    label: title ?? slug ?? id,
    at: one.at,
    color: null,
    url: `${SITE}${href}`,
    children: [...children].sort(byLabel),
  }
}

export function assembleWorldTree(worlds: readonly Paged[], stories: readonly Paged[]): WorldTree {
  const named = new Set<string>()
  for (const world of worlds) {
    const slug = textIn(world.value, "slug")
    if (slug !== null) named.add(slug)
  }
  const told = new Map<string, WorldTreeRow[]>()
  const unreached: string[] = []
  for (const story of stories) {
    const row = rowOf(story, [])
    if (row === null) continue
    const world = slugAt(story.value, WORLD)
    if (world === null || !named.has(world)) {
      unreached.push(row.label)
      continue
    }
    told.set(world, [...(told.get(world) ?? []), row])
  }
  const under: WorldTreeRow[] = []
  for (const world of worlds) {
    const row = rowOf(world, told.get(textIn(world.value, "slug") ?? "") ?? [])
    if (row !== null) under.push(row)
  }
  const top: WorldTreeRow = {
    key: TOP,
    label: TOP,
    at: null,
    color: null,
    url: `${SITE}/${WORLD}`,
    children: under.sort(byLabel),
  }
  return { roots: [top], unreached: unreached.sort() }
}
