import { episode } from "akasha/alan/collection/watching/episode/episode.page-type.ts"
import { season } from "akasha/alan/collection/watching/season/season.page-type.ts"
import { show } from "akasha/alan/collection/watching/show/show.page-type.ts"
import { squashed } from "akasha/command/pages/watching/hallmark/modules/hallmark-matching/hallmark-matching.module.code.ts"
import {
  type Entry,
  yearOf,
} from "akasha/command/pages/watching/hallmark/modules/hallmark-series/hallmark-series.module.code.ts"
import type { Row } from "akasha/page/service/modules/page-asking/page-asking.module.code.ts"

export type Gone = { readonly pageTypeSlug: string; readonly slug: string }

type Said = Readonly<Record<string, unknown>>

export function recordsOf(said: unknown): readonly Said[] {
  if (!Array.isArray(said)) return []
  return (said as readonly unknown[]).filter(
    (one): one is Said => one !== null && typeof one === "object"
  )
}

export function textsOf(said: unknown): readonly string[] {
  if (!Array.isArray(said)) return []
  return (said as readonly unknown[]).filter((one): one is string => typeof one === "string")
}

export function tmdbIdOf(row: Row): string | null {
  const one = recordsOf(row.externalIdentity).find((said) => said.source === "tmdb")
  return typeof one?.externalId === "string" ? one.externalId : null
}

function slugOfRow(row: Row): string {
  return typeof row.slug === "string" ? row.slug : ""
}

export function misfiledShow(
  one: Entry,
  shows: readonly Row[],
  shelving: ReadonlySet<string>
): Row | null {
  const refused = one.refused
  if (one.kind !== "movie" || one.titled !== null || refused?.kind !== "tv") return null
  const year = yearOf(one.listed?.aired)
  const fits = (row: Row): boolean => {
    if (typeof row.title !== "string" || squashed(row.title) !== squashed(one.title)) return false
    const id = tmdbIdOf(row)
    if (id !== null && id !== String(refused.id)) return false
    if (!textsOf(row.partOfCollections).some((under) => shelving.has(under))) return false
    const was = yearOf(row.publishedAt)
    return was === null || year === null || Math.abs(was - year) <= 1
  }
  return shows.find(fits) ?? null
}

function underAny(rows: readonly Row[], parents: ReadonlySet<string>): readonly Row[] {
  return rows.filter((row) => textsOf(row.partOfCollections).some((one) => parents.has(one)))
}

export function goneWith(
  held: Row,
  seasons: readonly Row[],
  episodes: readonly Row[]
): readonly Gone[] {
  const under = underAny(seasons, new Set([`${show.slug}/${slugOfRow(held)}`]))
  const parents = new Set(under.map((row) => `${season.slug}/${slugOfRow(row)}`))
  const leaves = underAny(episodes, parents)
  return [
    { pageTypeSlug: show.slug, slug: slugOfRow(held) },
    ...under.map((row) => ({ pageTypeSlug: season.slug, slug: slugOfRow(row) })),
    ...leaves.map((row) => ({ pageTypeSlug: episode.slug, slug: slugOfRow(row) })),
  ]
}
