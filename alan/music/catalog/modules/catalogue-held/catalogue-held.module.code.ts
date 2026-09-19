import { idFrom } from "akasha/alan/collection/external/modules/external-identity-reading/external-identity-reading.module.code.ts"
import {
  artistSlugOf,
  type CatalogueNames,
  catalogueNamesFrom,
} from "akasha/alan/music/catalog/modules/catalogue-slug/catalogue-slug.module.code.ts"
import { identityHeld } from "akasha/alan/music/catalog/modules/musicbrainz-map/musicbrainz-map.module.code.ts"
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
  return { names: catalogueNamesFrom(rows), held }
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
