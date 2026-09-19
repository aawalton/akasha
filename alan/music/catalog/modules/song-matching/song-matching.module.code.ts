import { artistSlugOf } from "akasha/alan/music/catalog/modules/catalogue-slug/catalogue-slug.module.code.ts"
import { valuesOfType } from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import {
  recordsIn,
  slugsIn,
  textIn,
  type Value,
} from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"

const SONG = "song"

const UNDER_ARTIST = "artist/"

const RELEASE = "release"

const TRACK = "track"

const TRACK_ARTIST = "trackArtist"

const LOOSE = /[^a-z0-9]+/gu

const DOUBLED = /\s{2,}/gu

const SPACES = /\s+/gu

const CREDIT = "(?:feat|ft|featuring|with)\\b"

const VERSION =
  "\\b(?:re-?mix(?:es|ed)?|mix|live|acoustic|stripped|instrumental|a\\s?ca?pp?ella|demo" +
  "|remaster(?:ed)?|sped\\s*up|slowed|reprise|extended|version|edit|session|mono|stereo" +
  "|take|rehearsal|single|alternate)\\b"

const ASIDE = new RegExp(
  `\\s*[(\\[](?=[^()\\[\\]]*(?:${CREDIT}|${VERSION}))[^()\\[\\]]*[)\\]]`,
  "giu"
)

const DASHES = "-\\u2013\\u2014"

const TRAILING = new RegExp(
  `\\s+[${DASHES}]\\s+(?=[^${DASHES}]*(?:${CREDIT}|${VERSION}))[^${DASHES}]*$`,
  "iu"
)

export function compositionTitle(title: string): string {
  let held = title
  for (;;) {
    const dropped = held.replace(ASIDE, "").replace(TRAILING, "").trim()
    if (dropped === "" || dropped === held) break
    held = dropped
  }
  return held.replace(DOUBLED, " ")
}

export function looseTitle(title: string): string {
  const said = title.normalize("NFKD").toLowerCase()
  const held = said.replace(LOOSE, "")
  return held === "" ? said.replace(SPACES, "") : held
}

export function songKey(artistSlug: string, title: string): string {
  return `${artistSlug}|${looseTitle(title)}`
}

export function artistUnder(value: Value): string | null {
  const held = value["partOfCollections"]
  if (!Array.isArray(held)) return null
  for (const said of held) {
    if (typeof said === "string" && said.startsWith(UNDER_ARTIST)) {
      return said.slice(UNDER_ARTIST.length)
    }
  }
  return null
}

export function artistByRelease(root: string): ReadonlyMap<string, string> {
  const byRelease = new Map<string, string>()
  for (const one of valuesOfType(root, RELEASE)) {
    const slug = textIn(one.value, "slug")
    const artistSlug = artistUnder(one.value)
    if (slug === null || artistSlug === null) continue
    byRelease.set(slug, artistSlug)
  }
  return byRelease
}

export function artistCredited(value: Value): string | null {
  const first = recordsIn(value[TRACK_ARTIST])[0]
  const name = first === undefined ? null : textIn(first, "artistName")
  return name === null || name.trim() === "" ? null : artistSlugOf(name)
}

export function artistOf(byRelease: ReadonlyMap<string, string>, value: Value): string | null {
  const releaseSlug = slugsIn(value["partOfCollections"])[0]
  const under = releaseSlug === undefined ? undefined : byRelease.get(releaseSlug)
  return under ?? artistCredited(value)
}

export function titlesUnderArtist(root: string): ReadonlyMap<string, ReadonlySet<string>> {
  const byRelease = artistByRelease(root)
  const held = new Map<string, Set<string>>()
  for (const one of valuesOfType(root, TRACK)) {
    const artist = artistOf(byRelease, one.value)
    const title = textIn(one.value, "title")
    if (artist === null || title === null) continue
    const kept = held.get(artist) ?? new Set<string>()
    kept.add(looseTitle(compositionTitle(title)))
    held.set(artist, kept)
  }
  return held
}

export function songNamed(value: Value): string | null {
  const said = textIn(value, SONG)
  if (said === null) return null
  return said.startsWith(`${SONG}/`) ? said.slice(SONG.length + 1) : said
}

export function valuesLinked(value: Value, song: string | null): Value {
  const held: Value = { ...value }
  if (song === null) {
    delete held[SONG]
    return held
  }
  return { ...held, [SONG]: `${SONG}/${song}` }
}

export function songsFiledIn(root: string): ReadonlyMap<string, string> {
  const byTitle = new Map<string, string>()
  for (const one of valuesOfType(root, SONG)) {
    const slug = textIn(one.value, "slug")
    const title = textIn(one.value, "title")
    const artist = textIn(one.value, "artist")
    if (slug === null || title === null || artist === null) continue
    const under = artist.startsWith(UNDER_ARTIST) ? artist.slice(UNDER_ARTIST.length) : artist
    const key = songKey(under, title)
    if (!byTitle.has(key)) byTitle.set(key, slug)
  }
  return byTitle
}

export function songSlugFor(
  songs: ReadonlyMap<string, string>,
  artistSlug: string,
  title: string
): string | null {
  return (
    songs.get(songKey(artistSlug, title)) ??
    songs.get(songKey(artistSlug, compositionTitle(title))) ??
    null
  )
}
