import { idFrom } from "akasha/alan/collection/external/modules/external-identity-reading/external-identity-reading.module.code.ts"
import {
  artistSlugOf,
  type CatalogueNames,
  catalogueNamesFrom,
} from "akasha/alan/music/catalog/modules/catalogue-slug/catalogue-slug.module.code.ts"
import { identityHeld } from "akasha/alan/music/catalog/modules/musicbrainz-map/musicbrainz-map.module.code.ts"
import {
  compositionTitle,
  looseTitle,
  songsFiledIn,
} from "akasha/alan/music/catalog/modules/song-matching/song-matching.module.code.ts"
import { valuesOfType } from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import {
  textIn,
  type Value,
} from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"

const ARTIST = "artist"

const SONG = "song"

const MUSICBRAINZ = "musicbrainz"

const IDENTITY = "externalIdentity"

export type Catalogue = {
  readonly names: CatalogueNames
  readonly held: ReadonlyMap<string, Value>
  readonly byTitle: ReadonlyMap<string, string>
}

export type Named = { readonly slug: string; readonly was: Value }

export function catalogueIn(root: string, artistSlug: string): Catalogue {
  const under = `${ARTIST}/${artistSlug}`
  const rows: { readonly slug: string; readonly externalId: string | null }[] = []
  const held = new Map<string, Value>()
  for (const one of valuesOfType(root, SONG)) {
    const slug = textIn(one.value, "slug")
    if (slug === null) continue
    const mine = textIn(one.value, "artist") === under
    rows.push({ slug, externalId: mine ? idFrom(one.value[IDENTITY], MUSICBRAINZ) : null })
    held.set(slug, one.value)
  }
  return { names: catalogueNamesFrom(rows), held, byTitle: songsFiledIn(root) }
}

const STRANGER =
  "so this names another artist of that name rather than the one whose tracks are filed"

export function metIn(held: ReadonlySet<string> | undefined, titles: readonly string[]): number {
  if (held === undefined) return 0
  let met = 0
  for (const one of titles) {
    if (held.has(looseTitle(compositionTitle(one)))) met += 1
  }
  return met
}

export function strangerIn(args: {
  readonly artistName: string
  readonly artistSlug: string
  readonly held: ReadonlySet<string> | undefined
  readonly titles: readonly string[]
  readonly sayInstead: string
}): string | null {
  if (args.held === undefined || args.held.size === 0) return null
  if (args.titles.length === 0) return null
  if (metIn(args.held, args.titles) > 0) return null
  return (
    `MusicBrainz answers \`${args.artistName}\` with ${args.titles.length} title(s) and none is ` +
    `a track filed under \`${ARTIST}/${args.artistSlug}\`, ${STRANGER} — ${args.sayInstead}`
  )
}

export function artistIn(root: string, mbid: string, name: string): Named {
  const wanted = artistSlugOf(name)
  let named: Named | null = null
  for (const one of valuesOfType(root, ARTIST)) {
    const slug = textIn(one.value, "slug")
    if (slug === null) continue
    if (identityHeld(one.value[IDENTITY], mbid)) return { slug, was: one.value }
    if (slug === wanted) named = { slug, was: one.value }
  }
  return named ?? { slug: wanted, was: {} }
}
