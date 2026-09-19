import { mintCatalogueSlug } from "akasha/alan/music/catalog/modules/catalogue-slug/catalogue-slug.module.code.ts"
import {
  compositionTitle,
  songKey,
  songSlugFor,
  songsFiledIn,
} from "akasha/alan/music/catalog/modules/song-matching/song-matching.module.code.ts"
import { valuesOfType } from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import { namedAs } from "akasha/page/modules/address/page-address.module.code.ts"
import {
  textIn,
  type Value,
} from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import {
  propertiesIfNamed,
  type Source,
} from "akasha/page/type/modules/declared-properties/declared-properties.module.code.ts"

const ARTIST = "artist"

const SONG = "song"

const PAGE_TYPE = "page-type"

const ARTIST_SLUG_KEY = "artistSlug"

export function artistKeyIn(source: Source): string {
  const declared = propertiesIfNamed(SONG, source)
  const named = declared === null ? [] : declared.map((one) => one.key)
  return named.includes(ARTIST) ? ARTIST : ARTIST_SLUG_KEY
}

export function underArtistKey(values: Value, key: string): Value {
  const { artist, artistSlug, ...rest } = values
  const said = key === ARTIST ? (artist ?? artistSlug) : (artistSlug ?? artist)
  return said === undefined ? rest : { ...rest, [key]: said }
}

export type Filing = {
  readonly songs: Map<string, string>
  readonly taken: Set<string>
  readonly artists: ReadonlySet<string>
}

export type Filed = { readonly slug: string; readonly values: Value | null }

function slugsOfType(root: string, pageTypeSlug: string): Set<string> {
  const held = new Set<string>()
  for (const one of valuesOfType(root, pageTypeSlug)) {
    const slug = textIn(one.value, "slug")
    if (slug !== null) held.add(slug)
  }
  return held
}

export function filingIn(root: string): Filing {
  return {
    songs: new Map(songsFiledIn(root)),
    taken: slugsOfType(root, SONG),
    artists: slugsOfType(root, ARTIST),
  }
}

export function songValuesFor(artistSlug: string, slug: string, title: string): Value {
  return {
    type: namedAs(PAGE_TYPE, SONG, null),
    slug,
    title,
    artist: namedAs(ARTIST, artistSlug, null),
    performed: true,
  }
}

export function songFiledFor(filing: Filing, artistSlug: string, said: string): Filed | null {
  if (!filing.artists.has(artistSlug)) return null
  const title = compositionTitle(said)
  const key = songKey(artistSlug, title)
  const held = filing.songs.get(key)
  if (held !== undefined) return { slug: held, values: null }
  const slug = mintCatalogueSlug(artistSlug, title, filing.taken)
  filing.taken.add(slug)
  filing.songs.set(key, slug)
  return { slug, values: songValuesFor(artistSlug, slug, title) }
}

export function songForTrack(filing: Filing, artistSlug: string, said: string): Filed | null {
  const held = songSlugFor(filing.songs, artistSlug, said)
  if (held !== null) return { slug: held, values: null }
  return songFiledFor(filing, artistSlug, said)
}
