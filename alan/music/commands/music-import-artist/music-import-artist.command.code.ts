import { landingAsked, wroteAndTook } from "@akasha/command-system/asking"
import type { Answer, Given } from "@akasha/command-system/calling"
import { refused } from "@akasha/command-system/calling"
import { saidBy } from "@akasha/command-system/fault-saying"
import type { FileEdit } from "@akasha/command-system/landing"
import { valuesOfType } from "@akasha/indexes"
import { besideAt } from "@akasha/pages-system/page-file-name"
import type { Value } from "@akasha/pages-system/page-value"
import { composedFor, type Put } from "@akasha/pages-system-service/composing"
import { todayYYYYMMDD } from "@akasha/utils-sync/today"
import { searchLyrics } from "../../catalog/lrclib-client/lrclib-client.module.code.ts"
import {
  lyricsFieldsOf,
  pickBestLyrics,
  type SongLyrics,
} from "../../catalog/lrclib-map/lrclib-map.module.code.ts"
import type { LrclibRecord } from "../../catalog/lrclib-schema/lrclib-schema.module.code.ts"
import {
  browseArtistRecordings,
  browseWorks,
  getArtist,
  searchArtist,
} from "../../catalog/musicbrainz-client/musicbrainz-client.module.code.ts"
import {
  dedupeRecordings,
  extractGenres,
  isSongWork,
  mbArtistToFields,
  mbRecordingToSongFields,
  mbWorkToSongFields,
  performedWorkIds,
  pickBestArtist,
  type SongFields,
} from "../../catalog/musicbrainz-map/musicbrainz-map.module.code.ts"
import type {
  MbArtist,
  MbArtistSearchHit,
  MbRecording,
  MbWork,
} from "../../catalog/musicbrainz-schema/musicbrainz-schema.module.code.ts"
import {
  artistSlugOf,
  type SongNames,
  songNamesFrom,
  songSlugFor,
} from "../../catalog/song-slug/song-slug.module.code.ts"

const INPUT = 1

const DATA = 2

const OPERATIONAL = 3

const ARTIST = "artist"

const SONG = "song"

const TXT = "txt"

const LYRICS = "lyrics"

const SYNCED_LYRICS = "synced-lyrics"

const NAME = "--name"

const MBID = "--mbid"

const LIMIT = "--limit"

const JSON_SAID = "--json"

const VALUED = [NAME, MBID, LIMIT]

const BARE = [JSON_SAID]

const UNNAMED = `this call names no artist — say one after the command, or at \`${NAME}\` or \`${MBID}\``

export type Reach = {
  readonly searchArtist: (name: string) => Promise<readonly MbArtistSearchHit[]>
  readonly getArtist: (mbid: string) => Promise<MbArtist>
  readonly browseWorks: (mbid: string) => Promise<readonly MbWork[]>
  readonly browseRecordings: (mbid: string) => Promise<readonly MbRecording[]>
  readonly searchLyrics: (title: string, artistName: string) => Promise<readonly LrclibRecord[]>
}

export const REACHING: Reach = {
  searchArtist,
  getArtist,
  browseWorks,
  browseRecordings: browseArtistRecordings,
  searchLyrics,
}

export type Taken = {
  readonly name: string | null
  readonly mbid: string | null
  readonly limit: number | null
  readonly json: boolean
}

export type Reading = Taken | { readonly refused: string }

export type Imported = {
  readonly mbid: string
  readonly artistName: string
  readonly artistSlug: string
  readonly songsTotal: number
  readonly songsWritten: number
  readonly songsWithLyrics: number
  readonly songsLyricsUnread: number
  readonly derivedFrom: "works" | "recordings"
}

export type Gathered = { readonly said: Imported; readonly changes: readonly FileEdit[] }

export function taken(argv: readonly string[]): Reading {
  const held = new Map<string, string>()
  const bare = new Set<string>()
  let said: string | null = null
  let at = 0
  while (at < argv.length) {
    const one = argv[at] as string
    at += 1
    if (BARE.includes(one)) {
      bare.add(one)
      continue
    }
    if (!one.startsWith("-")) {
      if (said !== null) {
        return { refused: `one artist is brought in, and \`${one}\` is named after \`${said}\`` }
      }
      said = one
      continue
    }
    if (!VALUED.includes(one)) return { refused: `\`${one}\` is nothing this takes` }
    const value = argv[at]
    at += 1
    if (value === undefined || value === "") {
      return { refused: `\`${one}\` takes a value, and this call names none after it` }
    }
    if (held.has(one)) {
      return { refused: `\`${one}\` is named twice, so which is meant is unsettled` }
    }
    held.set(one, value)
  }
  const name = held.get(NAME) ?? said
  const mbid = held.get(MBID) ?? null
  if ((name === null || name.trim() === "") && mbid === null) return { refused: UNNAMED }
  const asked = held.get(LIMIT)
  const limit = asked === undefined ? null : Number(asked)
  if (limit !== null && (!Number.isInteger(limit) || limit < 1)) {
    return {
      refused: `\`${LIMIT}\` takes a whole number of one or more, and this call names \`${asked}\``,
    }
  }
  return { name, mbid, limit, json: bare.has(JSON_SAID) }
}

export function rowsOf(said: Imported): readonly string[] {
  const rows = [
    `artist\t${said.artistName}\t${said.mbid}\t${said.artistSlug}`,
    `songs\t${said.songsWritten}`,
    `lyrics\t${said.songsWithLyrics}`,
    `source\t${said.derivedFrom}`,
  ]
  if (said.songsLyricsUnread > 0) rows.push(`lyrics-unread\t${said.songsLyricsUnread}`)
  return rows
}

export function jsonOf(said: Imported): string {
  return JSON.stringify({
    artist: { name: said.artistName, mbid: said.mbid, slug: said.artistSlug },
    songsTotal: said.songsTotal,
    songsWritten: said.songsWritten,
    songsWithLyrics: said.songsWithLyrics,
    songsLyricsUnread: said.songsLyricsUnread,
    derivedFrom: said.derivedFrom,
  })
}

type Catalogue = { readonly names: SongNames; readonly held: ReadonlyMap<string, Value> }

function textIn(value: Value, key: string): string | null {
  const one = value[key]
  return typeof one === "string" && one !== "" ? one : null
}

export function catalogueIn(root: string): Catalogue {
  const rows: { readonly slug: string; readonly externalId: string | null }[] = []
  const held = new Map<string, Value>()
  for (const one of valuesOfType(root, SONG)) {
    const slug = textIn(one.value, "slug")
    if (slug === null) continue
    rows.push({ slug, externalId: textIn(one.value, "externalId") })
    held.set(slug, one.value)
  }
  return { names: songNamesFrom(rows), held }
}

export function artistIn(
  root: string,
  mbid: string,
  name: string
): { readonly slug: string; readonly was: Value } {
  for (const one of valuesOfType(root, ARTIST)) {
    if (one.value["externalId"] !== mbid) continue
    const slug = textIn(one.value, "slug")
    if (slug !== null) return { slug, was: one.value }
  }
  return { slug: artistSlugOf(name), was: {} }
}

function edited(put: Put): FileEdit {
  return { path: put.path, body: new TextEncoder().encode(put.content) }
}

function wordEdits(put: Put, words: SongLyrics): readonly FileEdit[] {
  const edits: FileEdit[] = []
  for (const [propertySlug, text] of [
    [LYRICS, words.lyrics],
    [SYNCED_LYRICS, words.syncedLyrics],
  ] as const) {
    if (text === null) continue
    const beside = besideAt(put.path, propertySlug, TXT)
    if (beside === null) continue
    edits.push({ path: beside, body: new TextEncoder().encode(text) })
  }
  return edits
}

type Worded = { readonly words: SongLyrics | null; readonly unread: boolean }

async function wordsFor(reach: Reach, title: string, artistName: string): Promise<Worded> {
  try {
    const best = pickBestLyrics(await reach.searchLyrics(title, artistName), title, artistName)
    return { words: best === null ? null : lyricsFieldsOf(best), unread: false }
  } catch {
    return { words: null, unread: true }
  }
}

type Songed = { readonly edits: readonly FileEdit[]; readonly worded: Worded }

async function songLanded(
  root: string,
  catalogue: Catalogue,
  slug: string,
  fields: SongFields,
  artistName: string,
  reach: Reach
): Promise<Songed | { readonly refused: string }> {
  const worded = await wordsFor(reach, fields.title, artistName)
  const values: Value = {
    ...(catalogue.held.get(slug) ?? {}),
    ...fields,
    pageTypeSlug: SONG,
    slug,
  }
  if (worded.words !== null) {
    values["lyricsSource"] = worded.words.lyricsSource
    if (worded.words.lyrics !== null) values["lyrics"] = TXT
    if (worded.words.syncedLyrics !== null) values["syncedLyrics"] = TXT
  }
  const composed = composedFor(root, { pageTypeSlug: SONG, slug, values })
  if ("refused" in composed) return composed
  const edits = [edited(composed.put)]
  if (worded.words !== null) edits.push(...wordEdits(composed.put, worded.words))
  return { edits, worded }
}

type Asked = { readonly slug: string; readonly fields: SongFields; readonly title: string }

function askedOf(catalogue: Catalogue, artistSlug: string, fields: SongFields): Asked {
  const slug = songSlugFor(catalogue.names, artistSlug, fields.title, fields.externalId)
  return { slug, fields, title: fields.title }
}

async function mbidFor(held: Taken, reach: Reach): Promise<string | { readonly refused: string }> {
  const said = held.mbid
  if (said !== null && said !== "") return said
  const name = (held.name ?? "").trim()
  if (name === "") return { refused: UNNAMED }
  const best = pickBestArtist(await reach.searchArtist(name), name)
  return best === undefined ? { refused: `MusicBrainz answers no artist for \`${name}\`` } : best.id
}

async function songsAsked(
  held: Taken,
  reach: Reach,
  mbid: string,
  artistSlug: string,
  catalogue: Catalogue,
  today: string
): Promise<{ readonly asked: readonly Asked[]; readonly derivedFrom: "works" | "recordings" }> {
  const works = (await reach.browseWorks(mbid)).filter(isSongWork)
  const recordings = await reach.browseRecordings(mbid)
  if (works.length === 0) {
    const distinct = dedupeRecordings(recordings)
    const taking = held.limit === null ? distinct : distinct.slice(0, held.limit)
    return {
      asked: taking.map((one) =>
        askedOf(
          catalogue,
          artistSlug,
          mbRecordingToSongFields({
            title: one.title,
            recordingId: one.recordingId,
            artistSlug,
            today,
          })
        )
      ),
      derivedFrom: "recordings",
    }
  }
  const performed = performedWorkIds(recordings)
  const taking = held.limit === null ? works : works.slice(0, held.limit)
  return {
    asked: taking.map((one) =>
      askedOf(
        catalogue,
        artistSlug,
        mbWorkToSongFields({
          work: one,
          artistSlug,
          artistMbid: mbid,
          performed: performed.has(one.id),
          today,
        })
      )
    ),
    derivedFrom: "works",
  }
}

export async function gathered(
  root: string,
  held: Taken,
  reach: Reach,
  today: string
): Promise<Gathered | { readonly refused: string }> {
  const found = await mbidFor(held, reach)
  if (typeof found !== "string") return found
  const artist = await reach.getArtist(found)
  const named = artistIn(root, found, artist.name)
  const composed = composedFor(root, {
    pageTypeSlug: ARTIST,
    slug: named.slug,
    values: {
      ...named.was,
      ...mbArtistToFields({
        mbid: found,
        name: artist.name,
        genres: extractGenres(artist),
        today,
      }),
      pageTypeSlug: ARTIST,
      slug: named.slug,
    },
  })
  if ("refused" in composed) return composed
  const changes: FileEdit[] = [edited(composed.put)]
  const catalogue = catalogueIn(root)
  const songs = await songsAsked(held, reach, found, named.slug, catalogue, today)
  let songsWithLyrics = 0
  let songsLyricsUnread = 0
  for (const one of songs.asked) {
    const landed = await songLanded(root, catalogue, one.slug, one.fields, artist.name, reach)
    if ("refused" in landed) return landed
    changes.push(...landed.edits)
    if (landed.worded.words !== null) songsWithLyrics += 1
    if (landed.worded.unread) songsLyricsUnread += 1
  }
  return {
    said: {
      mbid: found,
      artistName: artist.name,
      artistSlug: named.slug,
      songsTotal: songs.asked.length,
      songsWritten: songs.asked.length,
      songsWithLyrics,
      songsLyricsUnread,
      derivedFrom: songs.derivedFrom,
    },
    changes,
  }
}

export async function musicImportArtist(argv: readonly string[], given: Given): Promise<Answer> {
  const held = taken(argv)
  if ("refused" in held) return refused(held.refused, INPUT)
  let found: Gathered | { readonly refused: string }
  try {
    found = await gathered(given.root, held, REACHING, todayYYYYMMDD())
  } catch (thrown) {
    return refused(saidBy(thrown), OPERATIONAL)
  }
  if ("refused" in found) return refused(found.refused, DATA)
  const answer = await landingAsked(given, {
    changes: found.changes,
    message: `import ${found.said.artistName} and ${found.said.songsWritten} songs from MusicBrainz`,
    dryRun: false,
    glass: null,
    unmoved: [],
    saying: wroteAndTook,
  })
  if (answer.code !== 0) return answer
  return {
    report: held.json ? [jsonOf(found.said)] : [...rowsOf(found.said), ...answer.report],
    refusals: [],
    code: 0,
  }
}
