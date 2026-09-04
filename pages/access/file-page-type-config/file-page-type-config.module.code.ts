import { type MediaConfig, parseMediaConfig } from "@akasha/pages-core/schema/media-config"
import { parseSequenceConfig, type SequenceConfig } from "@akasha/pages-core/schema/sequence-config"
import { slugsIn } from "@akasha/pages-system/page-value"
import type { Asked, Query } from "@akasha/pages-system-service/asking"
import { askingFor } from "@akasha/pages-system-service/calling"
import { z } from "zod"

const PAGE_TYPE_SLUG = "page-type"
const EXTENDS_SLUG = "extendsSlug"
const EXTENDS_CEILING = 20

export const SEQUENCE_CONFIG_KEY = "sequence"
export const MEDIA_CONFIG_KEY = "mediaConfig"

export type FilePageTypeConfigDeps = {
  readonly ask: (query: Query) => Promise<Asked>
}

export const LIVE_PAGE_TYPE_CONFIG: FilePageTypeConfigDeps = { ask: (query) => askingFor(query) }

export type StatedConfig =
  | {
      readonly asked: true
      readonly stands: boolean
      readonly value: unknown
      readonly extendsSlugs: readonly string[]
    }
  | { readonly asked: false; readonly why: string }

function opened(held: unknown): unknown {
  if (typeof held === "object" && held !== null) return held
  if (typeof held !== "string" || held.trim() === "") return null
  try {
    return z.unknown().parse(JSON.parse(held))
  } catch {
    return null
  }
}

function lastNamedFirst(named: readonly string[]): readonly string[] {
  return [...named].reverse()
}

export async function statedConfigValue(
  pageTypeSlug: string,
  key: string,
  deps: FilePageTypeConfigDeps = LIVE_PAGE_TYPE_CONFIG
): Promise<StatedConfig> {
  const asked = await deps.ask({
    pageTypeSlug: PAGE_TYPE_SLUG,
    where: { slug: { is: pageTypeSlug } },
    keys: ["slug", EXTENDS_SLUG, key],
    limit: 1,
  })
  if ("refused" in asked) return { asked: false, why: asked.refused }
  const row = asked.rows[0]
  if (row === undefined) return { asked: true, stands: false, value: null, extendsSlugs: [] }
  return {
    asked: true,
    stands: true,
    value: opened(row[key]),
    extendsSlugs: slugsIn(row[EXTENDS_SLUG]),
  }
}

export async function nearestConfigValue(
  pageTypeSlug: string,
  key: string,
  deps: FilePageTypeConfigDeps = LIVE_PAGE_TYPE_CONFIG
): Promise<StatedConfig> {
  const seen = new Set<string>()
  const waiting: string[] = [pageTypeSlug]
  for (let at = 0; at < waiting.length && seen.size < EXTENDS_CEILING; at += 1) {
    const here = waiting[at]
    if (here === undefined || seen.has(here)) continue
    seen.add(here)
    const stated: StatedConfig = await statedConfigValue(here, key, deps)
    if (!stated.asked) return stated
    if (!stated.stands) continue
    if (stated.value !== null) return stated
    for (const above of lastNamedFirst(stated.extendsSlugs)) waiting.push(above)
  }
  return { asked: true, stands: false, value: null, extendsSlugs: [] }
}

export function reached(stated: StatedConfig, what: string): unknown {
  if (stated.asked) return stated.value
  throw new Error(
    `${what}: the pages did not answer, so this reader holds no page-type config to report; a null would read as a page type that declares none (${stated.why})`
  )
}

export async function fileSequenceConfig(
  pageTypeSlug: string,
  deps: FilePageTypeConfigDeps = LIVE_PAGE_TYPE_CONFIG
): Promise<SequenceConfig | null> {
  const stated = await nearestConfigValue(pageTypeSlug, SEQUENCE_CONFIG_KEY, deps)
  return parseSequenceConfig(reached(stated, `fileSequenceConfig(${pageTypeSlug})`))
}

export async function fileMediaConfig(
  pageTypeSlug: string,
  deps: FilePageTypeConfigDeps = LIVE_PAGE_TYPE_CONFIG
): Promise<MediaConfig | null> {
  const stated = await nearestConfigValue(pageTypeSlug, MEDIA_CONFIG_KEY, deps)
  return parseMediaConfig(reached(stated, `fileMediaConfig(${pageTypeSlug})`))
}

function inheritsFrom(
  slug: string,
  declares: ReadonlySet<string>,
  extendsOf: ReadonlyMap<string, readonly string[]>
): boolean {
  const seen = new Set<string>()
  const waiting: string[] = [slug]
  for (let at = 0; at < waiting.length && seen.size < EXTENDS_CEILING; at += 1) {
    const here = waiting[at]
    if (here === undefined || seen.has(here)) continue
    seen.add(here)
    if (declares.has(here)) return true
    for (const above of lastNamedFirst(extendsOf.get(here) ?? [])) waiting.push(above)
  }
  return false
}

export async function fileMediaPageTypeSlugs(
  deps: FilePageTypeConfigDeps = LIVE_PAGE_TYPE_CONFIG
): Promise<ReadonlySet<string>> {
  const asked = await deps.ask({
    pageTypeSlug: PAGE_TYPE_SLUG,
    keys: ["slug", EXTENDS_SLUG, MEDIA_CONFIG_KEY],
  })
  if ("refused" in asked) {
    throw new Error(
      `fileMediaPageTypeSlugs: the pages did not answer, so no page type can be said to render media; an empty set would read as a tree where nothing does (${asked.refused})`
    )
  }
  const extendsOf = new Map<string, readonly string[]>()
  const declares = new Set<string>()
  for (const row of asked.rows) {
    const slug = row.slug
    if (typeof slug !== "string" || slug === "") continue
    extendsOf.set(slug, slugsIn(row[EXTENDS_SLUG]))
    if (opened(row[MEDIA_CONFIG_KEY]) !== null) declares.add(slug)
  }
  const kin = new Set<string>()
  for (const slug of extendsOf.keys()) {
    if (!inheritsFrom(slug, declares, extendsOf)) continue
    kin.add(slug)
  }
  if (kin.size === 0) {
    throw new Error(
      `fileMediaPageTypeSlugs: the pages answered over ${extendsOf.size} page types and not one states \`${MEDIA_CONFIG_KEY}\`, so nothing here is rendered as audio or as an image and no media route can serve anything; an empty set would read as this page id being no media page rather than as a tree holding no media page type at all`
    )
  }
  return kin
}
