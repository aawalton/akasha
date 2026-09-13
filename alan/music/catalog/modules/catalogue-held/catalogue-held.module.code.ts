import { idFrom } from "akasha/alan/collections/externals/modules/external-identity-reading/external-identity-reading.module.code.ts"
import { identityHeld } from "akasha/alan/music/catalog/modules/musicbrainz-map/musicbrainz-map.module.code.ts"
import {
  artistSlugOf,
  type SongNames,
  songNamesFrom,
} from "akasha/alan/music/catalog/modules/song-slug/song-slug.module.code.ts"
import { valuesOfType } from "akasha/pages/indexes/modules/reading/index-reading.module.code.ts"
import {
  textIn,
  type Value,
} from "akasha/pages/modules/value-reading/page-value-reading.module.code.ts"

const ARTIST = "artist"

const SONG = "song"

const MUSICBRAINZ = "musicbrainz"

const IDENTITY = "externalIdentity"

export type Catalogue = { readonly names: SongNames; readonly held: ReadonlyMap<string, Value> }

export type Named = { readonly slug: string; readonly was: Value }

export function withoutFlatIdentity(held: Value): Value {
  const { externalId, externalLink, source, lastSyncedAt, ...rest } = held
  return rest
}

export function flatlyHeld(held: Value, mbid: string): boolean {
  return held["externalId"] === mbid && held["source"] === MUSICBRAINZ
}

export function catalogueIn(root: string): Catalogue {
  const rows: { readonly slug: string; readonly externalId: string | null }[] = []
  const held = new Map<string, Value>()
  for (const one of valuesOfType(root, SONG)) {
    const slug = textIn(one.value, "slug")
    if (slug === null) continue
    const stated = one.value[IDENTITY]
    rows.push({ slug, externalId: idFrom(stated, MUSICBRAINZ) ?? textIn(one.value, "externalId") })
    held.set(slug, one.value)
  }
  return { names: songNamesFrom(rows), held }
}

export function artistIn(root: string, mbid: string, name: string): Named {
  for (const one of valuesOfType(root, ARTIST)) {
    const found = identityHeld(one.value[IDENTITY], mbid) || flatlyHeld(one.value, mbid)
    if (!found) continue
    const slug = textIn(one.value, "slug")
    if (slug !== null) return { slug, was: one.value }
  }
  return { slug: artistSlugOf(name), was: {} }
}
