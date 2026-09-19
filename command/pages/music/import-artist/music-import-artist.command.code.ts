import { existsSync, readFileSync } from "node:fs"
import { join } from "node:path"
import { identitiesWith } from "akasha/alan/collection/external/modules/external-identity-reading/external-identity-reading.module.code.ts"
import {
  artistIn,
  type Catalogue,
  catalogueIn,
} from "akasha/alan/music/catalog/modules/catalogue-held/catalogue-held.module.code.ts"
import { catalogueSlugFor } from "akasha/alan/music/catalog/modules/catalogue-slug/catalogue-slug.module.code.ts"
import { searchLyrics } from "akasha/alan/music/catalog/modules/lrclib-client/lrclib-client.module.code.ts"
import {
  lyricsFieldsOf,
  pickBestLyrics,
  type SongLyrics,
} from "akasha/alan/music/catalog/modules/lrclib-map/lrclib-map.module.code.ts"
import type { LrclibRecord } from "akasha/alan/music/catalog/modules/lrclib-schema/lrclib-schema.module.code.ts"
import {
  browseArtistRecordings,
  browseWorks,
  getArtist,
  searchArtist,
} from "akasha/alan/music/catalog/modules/musicbrainz-client/musicbrainz-client.module.code.ts"
import {
  dedupeRecordings,
  extractGenres,
  isSongWork,
  mbArtistIdentity,
  mbArtistToFields,
  mbRecordingToSongFields,
  mbWorkToSongFields,
  performedWorkIds,
  pickBestArtist,
  type SongFields,
  songIdIn,
} from "akasha/alan/music/catalog/modules/musicbrainz-map/musicbrainz-map.module.code.ts"
import type {
  MbArtist,
  MbArtistSearchHit,
  MbRecording,
  MbWork,
} from "akasha/alan/music/catalog/modules/musicbrainz-schema/musicbrainz-schema.module.code.ts"
import { songKey } from "akasha/alan/music/catalog/modules/song-matching/song-matching.module.code.ts"
import { changeMechanical } from "akasha/change/mechanical/change-mechanical.page-type.ts"
import { addFileOfAnyKind } from "akasha/change/mechanical/file/add/add-file-of-any-kind/add-file-of-any-kind.change-mechanical.ts"
import type { Asking } from "akasha/change/runner/pages/mechanical-change-running/mechanical-change-running.change-runner.code.ts"
import {
  type Landing,
  runMechanicalChange,
} from "akasha/change/runner/pages/mechanical-change-running/mechanical-change-running.change-runner.code.ts"
import { takenFor } from "akasha/command/argument/modules/taking/argument-taking.module.code.ts"
import { artistName as artistNameArgument } from "akasha/command/argument/pages/artist-name.argument.ts"
import { json } from "akasha/command/argument/pages/json.argument.ts"
import { mbid as mbidArgument } from "akasha/command/argument/pages/mbid.argument.ts"
import { songLimit } from "akasha/command/argument/pages/song-limit.argument.ts"
import {
  answeredWith,
  answering,
  DATA,
  INPUT,
  keeping,
  OPERATIONAL,
  refused,
  told,
} from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { musicImportArtist as page } from "akasha/command/pages/music/import-artist/music-import-artist.command.ts"
import { namedAs } from "akasha/page/modules/address/page-address.module.code.ts"
import { besideAt } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import type { Value } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import {
  composedFor,
  type Put,
  sourceFor,
} from "akasha/page/service/modules/page-composing/page-composing.module.code.ts"
import {
  propertiesIfNamed,
  type Source,
} from "akasha/page/type/modules/declared-properties/declared-properties.module.code.ts"
import { todayYYYYMMDD } from "akasha/text/writing/modules/today/today.module.code.ts"

const ARTIST = "artist"

const SONG = "song"

const PAGE_TYPE = "page-type"

const TXT = "txt"

const LYRICS = "lyrics"

const SYNCED_LYRICS = "synced-lyrics"

const NAMED = [json, songLimit, artistNameArgument, mbidArgument] as const

const BLANK = `\`${artistNameArgument.said}\` names no artist, and no \`${mbidArgument.said}\` was said either`

export const WRITE = `${changeMechanical.slug}/${addFileOfAnyKind.slug}` as const

export type Reach = {
  readonly searchArtist: (name: string) => Promise<readonly MbArtistSearchHit[]>
  readonly getArtist: (mbid: string) => Promise<MbArtist>
  readonly browseWorks: (mbid: string) => Promise<readonly MbWork[]>
  readonly browseRecordings: (mbid: string) => Promise<readonly MbRecording[]>
  readonly searchLyrics: (title: string, artistName: string) => Promise<readonly LrclibRecord[]>
}

const REACHING: Reach = {
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

export type Gathered = { readonly said: Imported; readonly changes: readonly Asking[] }

export function taken(argv: readonly string[], calledAs: string): Reading {
  const read = takenFor(argv, calledAs, page, NAMED)
  if ("refused" in read) return { refused: read.refused.join(" ") }
  const held = read.taken
  const name = held.artistName ?? null
  const said = held.mbid ?? null
  if (name !== null && name.trim() === "" && said === null) return { refused: BLANK }
  const limit = held.songLimit ?? null
  if (limit !== null && limit < 1) {
    return {
      refused: `\`${songLimit.said}\` takes a whole number of one or more, and this call names \`${limit}\``,
    }
  }
  return { name, mbid: said, limit, json: held.json }
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

function edited(put: Put): Asking {
  return { at: WRITE, given: { at: put.path, body: put.content } }
}

function heldAt(root: string, at: string): string | null {
  const full = join(root, at)
  return existsSync(full) ? readFileSync(full, "utf8") : null
}

function wordEdits(root: string, put: Put, words: SongLyrics): readonly Asking[] {
  const edits: Asking[] = []
  for (const [propertySlug, text] of [
    [LYRICS, words.lyrics],
    [SYNCED_LYRICS, words.syncedLyrics],
  ] as const) {
    if (text === null) continue
    const beside = besideAt(put.path, propertySlug, TXT)
    if (beside === null) continue
    if (heldAt(root, beside) === text) continue
    edits.push({ at: WRITE, given: { at: beside, body: text } })
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

type Songed = { readonly edits: readonly Asking[]; readonly worded: Worded }

const ARTIST_KEY = "artist"

const ARTIST_SLUG_KEY = "artistSlug"

function artistKeyIn(source: Source): string {
  const declared = propertiesIfNamed(SONG, source)
  const named = declared === null ? [] : declared.map((one) => one.key)
  return named.includes(ARTIST_KEY) ? ARTIST_KEY : ARTIST_SLUG_KEY
}

function underArtistKey(values: Value, key: string): Value {
  const { artist, artistSlug, ...rest } = values
  const said = key === ARTIST_KEY ? (artist ?? artistSlug) : (artistSlug ?? artist)
  return said === undefined ? rest : { ...rest, [key]: said }
}

async function songLanded(
  root: string,
  catalogue: Catalogue,
  slug: string,
  fields: SongFields,
  artistName: string,
  reach: Reach,
  source: Source
): Promise<Songed | { readonly refused: string }> {
  const worded = await wordsFor(reach, fields.title, artistName)
  const values: Value = underArtistKey(
    {
      ...(catalogue.held.get(slug) ?? {}),
      ...fields,
      type: namedAs(PAGE_TYPE, SONG, null),
      slug,
    },
    artistKeyIn(source)
  )
  if (worded.words !== null) {
    values["lyricsSource"] = worded.words.lyricsSource
    if (worded.words.lyrics !== null) values["lyrics"] = TXT
    if (worded.words.syncedLyrics !== null) values["syncedLyrics"] = TXT
  }
  const composed = composedFor(root, { pageTypeSlug: SONG, slug, values }, source)
  if ("refused" in composed) return composed
  const edits = [edited(composed.put)]
  if (worded.words !== null) edits.push(...wordEdits(root, composed.put, worded.words))
  return { edits, worded }
}

type Asked = { readonly slug: string; readonly fields: SongFields; readonly title: string }

export function askedOf(catalogue: Catalogue, artistSlug: string, fields: SongFields): Asked {
  const named = songIdIn(fields) ?? fields.title
  const held = catalogue.byTitle.get(songKey(artistSlug, fields.title))
  if (held !== undefined && !catalogue.names.filed.has(named)) {
    catalogue.names.filed.set(named, held)
  }
  const slug = catalogueSlugFor(catalogue.names, artistSlug, fields.title, named)
  return { slug, fields, title: fields.title }
}

async function mbidFor(held: Taken, reach: Reach): Promise<string | { readonly refused: string }> {
  const said = held.mbid
  if (said !== null && said !== "") return said
  const name = (held.name ?? "").trim()
  if (name === "") return { refused: BLANK }
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
  const source = sourceFor(root)
  const composed = composedFor(
    root,
    {
      pageTypeSlug: ARTIST,
      slug: named.slug,
      values: {
        ...named.was,
        ...mbArtistToFields({ name: artist.name, genres: extractGenres(artist) }),
        externalIdentity: identitiesWith(
          named.was["externalIdentity"],
          mbArtistIdentity({ mbid: found, today })
        ),
        type: namedAs(PAGE_TYPE, ARTIST, null),
        slug: named.slug,
      },
    },
    source
  )
  if ("refused" in composed) return composed
  const changes: Asking[] = [edited(composed.put)]
  const catalogue = catalogueIn(root, named.slug)
  const songs = await songsAsked(held, reach, found, named.slug, catalogue, today)
  let songsWithLyrics = 0
  let songsLyricsUnread = 0
  for (const one of songs.asked) {
    const landed = await songLanded(
      root,
      catalogue,
      one.slug,
      one.fields,
      artist.name,
      reach,
      source
    )
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

function messageOf(said: Imported): string {
  return `import ${said.artistName} and ${said.songsWritten} songs from MusicBrainz`
}

async function brought(
  done: string[],
  argv: readonly string[],
  given: Given,
  reach: Reach,
  landing: Landing
): Promise<Answer> {
  const held = taken(argv, given.calledAs)
  if ("refused" in held) return refused(held.refused, INPUT)
  const found = await gathered(given.root, held, reach, todayYYYYMMDD())
  if ("refused" in found) return refused(found.refused, DATA)
  const landed = await landing(given.root, found.changes, messageOf(found.said), { done })
  const wrote = "refusals" in landed ? [] : landed.landed.map((one) => `wrote ${one}`)
  const wrong = "refusals" in landed ? landed.refusals : landed.wrong
  if (wrong.length > 0) return keeping(done, answeredWith(wrote, wrong, OPERATIONAL))
  return told(held.json ? [jsonOf(found.said)] : [...rowsOf(found.said), ...wrote])
}

export async function musicImportArtist(
  argv: readonly string[],
  given: Given,
  reach: Reach = REACHING,
  landing: Landing = runMechanicalChange
): Promise<Answer> {
  return await answering(async (done) => await brought(done, argv, given, reach, landing))
}
