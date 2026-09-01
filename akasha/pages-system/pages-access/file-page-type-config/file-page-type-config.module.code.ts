import { type MediaConfig, parseMediaConfig } from "@akasha/pages-core/schema/media-config"
import { parseSequenceConfig, type SequenceConfig } from "@akasha/pages-core/schema/sequence-config"
import type { Asked } from "@shared/pages-query"
import { askComposed, type ComposedQuery } from "@shared/pages-query/ask"
import { z } from "zod"
import { isFileBacked } from "../file-read/file-read.module.code.ts"

const PAGE_TYPE_SLUG = "page-type"
const EXTENDS_SLUG = "extends-slug"
const EXTENDS_CEILING = 20

export const SEQUENCE_CONFIG_KEY = "sequence"
export const MEDIA_CONFIG_KEY = "media-config"

export type FilePageTypeConfigDeps = {
  readonly ask: (query: ComposedQuery) => Promise<Asked>
}

export const LIVE_PAGE_TYPE_CONFIG: FilePageTypeConfigDeps = { ask: (query) => askComposed(query) }

export type StatedConfig =
  | {
      readonly asked: true
      readonly stands: boolean
      readonly value: unknown
      readonly extendsSlug: string | null
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

export async function statedConfigValue(
  pageTypeSlug: string,
  key: string,
  deps: FilePageTypeConfigDeps = LIVE_PAGE_TYPE_CONFIG
): Promise<StatedConfig> {
  const asked = await deps.ask({
    "page-type": PAGE_TYPE_SLUG,
    where: { slug: { is: pageTypeSlug } },
    keys: ["slug", EXTENDS_SLUG, key],
    limit: 1,
  })
  if (!asked.ok) return { asked: false, why: asked.why }
  const row = asked.answer.rows[0]
  if (row === undefined) return { asked: true, stands: false, value: null, extendsSlug: null }
  const extendsSlug = row.values[EXTENDS_SLUG]
  return {
    asked: true,
    stands: true,
    value: opened(row.values[key]),
    extendsSlug: typeof extendsSlug === "string" && extendsSlug !== "" ? extendsSlug : null,
  }
}

export async function nearestConfigValue(
  pageTypeSlug: string,
  key: string,
  deps: FilePageTypeConfigDeps = LIVE_PAGE_TYPE_CONFIG
): Promise<StatedConfig> {
  const seen: string[] = []
  let at: string | null = pageTypeSlug
  for (let step = 0; at !== null && step < EXTENDS_CEILING; step += 1) {
    if (seen.includes(at)) break
    seen.push(at)
    const stated: StatedConfig = await statedConfigValue(at, key, deps)
    if (!stated.asked) return stated
    if (!stated.stands) break
    if (stated.value !== null) return stated
    at = stated.extendsSlug
  }
  return { asked: true, stands: false, value: null, extendsSlug: null }
}

function reached(stated: StatedConfig, what: string): unknown {
  if (stated.asked) return stated.value
  throw new Error(
    `${what}: the page query service did not answer, so this reader holds no page-type config to report; a null would read as a page type that declares none (${stated.why})`
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

let mediaKin: ReadonlySet<string> | null = null

export function forgetMediaPageTypes(): undefined {
  mediaKin = null
}

function inheritsFrom(
  slug: string,
  declares: ReadonlySet<string>,
  extendsOf: ReadonlyMap<string, string | null>
): boolean {
  let at: string | null | undefined = slug
  for (let step = 0; at != null && step < EXTENDS_CEILING; step += 1) {
    if (declares.has(at)) return true
    at = extendsOf.get(at) ?? null
  }
  return false
}

export async function fileMediaPageTypeSlugs(
  deps: FilePageTypeConfigDeps = LIVE_PAGE_TYPE_CONFIG
): Promise<ReadonlySet<string>> {
  if (mediaKin !== null) return mediaKin
  const asked = await deps.ask({
    "page-type": PAGE_TYPE_SLUG,
    keys: ["slug", EXTENDS_SLUG, MEDIA_CONFIG_KEY],
  })
  if (!asked.ok) {
    throw new Error(
      `fileMediaPageTypeSlugs: the page query service did not answer, so no page type can be said to render media; an empty set would read as a tree where nothing does (${asked.why})`
    )
  }
  const extendsOf = new Map<string, string | null>()
  const declares = new Set<string>()
  for (const row of asked.answer.rows) {
    const slug = row.values.slug
    if (typeof slug !== "string" || slug === "") continue
    const above = row.values[EXTENDS_SLUG]
    extendsOf.set(slug, typeof above === "string" && above !== "" ? above : null)
    if (opened(row.values[MEDIA_CONFIG_KEY]) !== null) declares.add(slug)
  }
  const kin = new Set<string>()
  for (const slug of extendsOf.keys()) {
    if (!inheritsFrom(slug, declares, extendsOf)) continue
    if (!(await isFileBacked(slug))) continue
    kin.add(slug)
  }
  mediaKin = kin
  return mediaKin
}
