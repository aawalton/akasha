import { type MediaConfig, parseMediaConfig } from "@shared/pages-core/schema/media-config"
import { parseSequenceConfig, type SequenceConfig } from "@shared/pages-core/schema/sequence-config"
import { askComposed, type ComposedQuery } from "@shared/pages-query/ask"
import { type Asked } from "../../pages-query/src/index"
import { z } from "zod"

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
