import {
  parseSequenceConfig,
  type SequenceConfig,
} from "akasha/page/core/schema/modules/sequence-config/sequence-config.module.code.ts"
import { slugsIn } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import type {
  Asked,
  Query,
} from "akasha/page/service/modules/page-asking/page-asking.module.code.ts"
import { askingFor } from "akasha/page/service/modules/page-calling/page-calling.module.code.ts"
import { z } from "zod"

const PAGE_TYPE_SLUG = "page-type"
const EXTENDS_SLUG = "extends"
const EXTENDS_CEILING = 20

export const SEQUENCE_CONFIG_KEY = "sequence"

export type FilePageTypeConfigDeps = {
  readonly ask: (query: Query) => Promise<Asked>
}

const LIVE_PAGE_TYPE_CONFIG: FilePageTypeConfigDeps = { ask: (query) => askingFor(query) }

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

function reached(stated: StatedConfig, what: string): unknown {
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
