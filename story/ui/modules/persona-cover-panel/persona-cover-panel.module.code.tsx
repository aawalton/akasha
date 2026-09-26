"use client"

import { SurfaceProvider } from "akasha/design/interface/primitive/modules/surface-provider/surface-provider.module.code.tsx"
import type { Page } from "akasha/page/core/modules/page-types/page-types.module.code.ts"
import { titledAs } from "akasha/page/core/modules/titled-as/titled-as.module.code.ts"
import { addressIn } from "akasha/page/modules/address/page-address.module.code.ts"
import {
  coverSource,
  PageCover,
} from "akasha/page/ui/component/modules/page-cover/page-cover.module.code.tsx"
import {
  type UsePagesSupabaseOptions,
  usePages,
} from "akasha/page/ui/supabase/modules/use-pages/use-pages.module.code.ts"
import { persona } from "akasha/persona/persona.page-type.ts"
import { characterOther } from "akasha/story/character/other/character-other.page-type.ts"
import { characterPersona } from "akasha/story/character/other/properties/character-persona.relation-property.ts"
import { characters } from "akasha/story/character/properties/characters.multi-relation-property.ts"
import type { ClientStoryTurn } from "akasha/story/ui/modules/client-story-session/client-story-session.module.code.ts"
import { storyTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.ts"
import { useMemo } from "react"

const ID_KEY = "id"

const SLUG_KEY = "slug"

const COVER_KEY = "cover"

const ONE = 1

function inList(keyed: string): readonly string[] {
  return keyed === "" ? [] : keyed.split(" ")
}

export type PersonaCover = {
  readonly slug: string
  readonly name: string
  readonly source: string
}

export function latestTurnId(turns: readonly ClientStoryTurn[]): string | null {
  return turns.at(-1)?.id ?? null
}

function slugOf(value: unknown, pageTypeSlug: string): string | null {
  if (typeof value !== "string") return null
  const address = addressIn(value)
  if (address.kind !== "qualified" || address.pageTypeSlug !== pageTypeSlug) return null
  return address.slug === "" ? null : address.slug
}

export function characterSlugsIn(value: unknown): readonly string[] {
  if (!Array.isArray(value)) return []
  const held: string[] = []
  for (const one of value) {
    const slug = slugOf(one, characterOther.slug)
    if (slug !== null && !held.includes(slug)) held.push(slug)
  }
  return held
}

export function personaSlugsOf(
  characterSlugs: readonly string[],
  rows: readonly Page[]
): readonly string[] {
  const held: string[] = []
  for (const slug of characterSlugs) {
    const row = rows.find((one) => one.slug === slug)
    const her = slugOf(row?.[characterPersona.propertySlug], persona.slug)
    if (her !== null && !held.includes(her)) held.push(her)
  }
  return held
}

export function personaCoversOf(
  slugs: readonly string[],
  rows: readonly Page[]
): readonly PersonaCover[] {
  const held: PersonaCover[] = []
  for (const slug of slugs) {
    const row = rows.find((one) => one.slug === slug)
    if (row === undefined) continue
    const source = coverSource(row[COVER_KEY])
    if (source === null) continue
    held.push({ slug, name: titledAs(slug), source })
  }
  return held
}

export function PersonaCoverPanel({ turns }: { turns: readonly ClientStoryTurn[] }) {
  const turnId = latestTurnId(turns)
  const turnOptions = useMemo<UsePagesSupabaseOptions>(
    () => ({
      pageTypeSlug: storyTurnPlayed.slug,
      where: [{ key: ID_KEY, in: turnId === null ? [] : [turnId] }],
      limit: ONE,
    }),
    [turnId]
  )
  const turnRows = usePages(turnOptions)
  const characterKeyed = characterSlugsIn(turnRows.rows[0]?.[characters.propertySlug]).join(" ")
  const characterOptions = useMemo<UsePagesSupabaseOptions>(
    () => ({
      pageTypeSlug: characterOther.slug,
      where: [{ key: SLUG_KEY, in: inList(characterKeyed) }],
    }),
    [characterKeyed]
  )
  const characterRows = usePages(characterOptions)
  const slugs = personaSlugsOf(inList(characterKeyed), characterRows.rows)
  const keyed = slugs.join(" ")
  const personaOptions = useMemo<UsePagesSupabaseOptions>(
    () => ({
      pageTypeSlug: persona.slug,
      where: [{ key: SLUG_KEY, in: inList(keyed) }],
    }),
    [keyed]
  )
  const personaRows = usePages(personaOptions)
  const covers = personaCoversOf(slugs, personaRows.rows)

  if (covers.length === 0) return null

  return (
    <SurfaceProvider level={1} className="flex flex-col gap-3 rounded-xl p-4 shadow-sm">
      {covers.map((one) => (
        <figure key={one.slug} className="flex flex-col gap-2">
          <PageCover coverUrl={one.source} />
          <figcaption className="font-mono text-[12px] text-secondary">{one.name}</figcaption>
        </figure>
      ))}
    </SurfaceProvider>
  )
}
