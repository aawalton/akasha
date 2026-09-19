import { valuesOfType } from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import { textIn } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"

const SONG = "song"

const UNDER_ARTIST = "artist/"

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
