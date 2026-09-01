import { patchPage, type Value } from "@shared/pages-query"
import { askComposed } from "@shared/pages-query/ask"
import { searchLyrics } from "../lrclib/client"
import { lyricsToProps, pickBestLyrics } from "../lrclib/map"
import { browseArtistRecordings, browseWorks, getArtist, searchArtist } from "./client"
import {
  dedupeRecordings,
  extractGenres,
  isSongWork,
  mbArtistToProps,
  mbRecordingToSongProps,
  mbWorkToSongProps,
  performedWorkIds,
  pickBestArtist,
} from "./map"
import { artistSlugOf, mintSongSlug } from "./song-slug"

const ARTIST_SLUG = "artist"
const SONG_SLUG = "music-song"

const WRITER = "musicbrainz-import"

export interface ImportArtistArgs {
  readonly name?: string
  readonly mbid?: string
  readonly limit?: number
  readonly today: string
}

export interface ImportArtistResult {
  readonly mbid: string
  readonly artistName: string
  readonly artistSlug: string
  readonly songsTotal: number
  readonly songsWritten: number
  readonly songsWithLyrics: number
  readonly derivedFrom: "works" | "recordings"
}

interface Catalogue {
  readonly taken: Set<string>
  readonly filed: Map<string, string>
}

function textOf(values: Readonly<Record<string, unknown>>, key: string): string | null {
  const held = values[key]
  return typeof held === "string" && held !== "" ? held : null
}

async function readCatalogue(): Promise<Catalogue> {
  const asked = await askComposed({ "page-type": SONG_SLUG, keys: ["slug", "external-id"] })
  if (!asked.ok) throw new Error(`the \`${SONG_SLUG}\` catalogue went unread: ${asked.why}`)
  const taken = new Set<string>()
  const filed = new Map<string, string>()
  for (const row of asked.answer.rows) {
    const name = textOf(row.values, "slug")
    if (name === null) continue
    taken.add(name)
    const externalId = textOf(row.values, "external-id")
    if (externalId !== null) filed.set(externalId, name)
  }
  return { taken, filed }
}

function nameForSong(
  catalogue: Catalogue,
  artistSlug: string,
  title: string,
  externalId: string
): string {
  const held = catalogue.filed.get(externalId)
  if (held !== undefined) return held
  const minted = mintSongSlug(artistSlug, title, catalogue.taken)
  catalogue.taken.add(minted)
  catalogue.filed.set(externalId, minted)
  return minted
}

async function lyricsPropsFor(
  title: string,
  artistName: string
): Promise<Record<string, Value> | null> {
  try {
    const records = await searchLyrics(title, artistName)
    const best = pickBestLyrics(records, title, artistName)
    return best != null ? lyricsToProps(best) : null
  } catch (err) {
    console.error(`  lyrics lookup failed for "${title}": ${String(err)}`)
    return null
  }
}

async function landSong(
  name: string,
  values: Record<string, Value>,
  title: string,
  artistName: string
): Promise<boolean> {
  const lyrics = await lyricsPropsFor(title, artistName)
  if (lyrics != null) Object.assign(values, lyrics)
  const landed = await patchPage(SONG_SLUG, name, values, WRITER)
  if (!landed.ok) throw new Error(`\`${SONG_SLUG}/${name}\` did not land: ${landed.why}`)
  return lyrics != null
}

async function landArtist(
  mbid: string,
  name: string,
  genres: readonly string[],
  today: string
): Promise<string> {
  const asked = await askComposed({
    "page-type": ARTIST_SLUG,
    where: { "external-id": { is: mbid } },
    keys: ["slug"],
    limit: 1,
  })
  if (!asked.ok) throw new Error(`\`${ARTIST_SLUG}\` went unread for ${mbid}: ${asked.why}`)
  const first = asked.answer.rows[0]
  const held = first === undefined ? null : textOf(first.values, "slug")
  const slug = held ?? artistSlugOf(name)
  const landed = await patchPage(
    ARTIST_SLUG,
    slug,
    mbArtistToProps({ mbid, name, genres, today }),
    WRITER
  )
  if (!landed.ok) throw new Error(`\`${ARTIST_SLUG}/${slug}\` did not land: ${landed.why}`)
  return slug
}

async function importFromRecordings(args: {
  readonly mbid: string
  readonly artistName: string
  readonly artistSlug: string
  readonly catalogue: Catalogue
  readonly today: string
  readonly limit?: number
}): Promise<ImportArtistResult> {
  const recordings = await browseArtistRecordings(args.mbid)
  const distinct = dedupeRecordings(recordings)
  const songs = args.limit != null ? distinct.slice(0, args.limit) : distinct
  console.error(
    `No works found; deriving from ${recordings.length} recordings → ${distinct.length} distinct songs; importing ${songs.length}…`
  )

  let songsWritten = 0
  let songsWithLyrics = 0
  for (const song of songs) {
    const values = mbRecordingToSongProps({
      title: song.title,
      recordingId: song.recordingId,
      artistSlug: args.artistSlug,
      today: args.today,
    })
    const name = nameForSong(args.catalogue, args.artistSlug, song.title, song.recordingId)
    if (await landSong(name, values, song.title, args.artistName)) songsWithLyrics += 1
    songsWritten += 1
    if (songsWritten % 25 === 0) console.error(`  …${songsWritten}/${songs.length}`)
  }

  console.error(`Lyrics found for ${songsWithLyrics}/${songs.length} songs`)
  return {
    mbid: args.mbid,
    artistName: args.artistName,
    artistSlug: args.artistSlug,
    songsTotal: songs.length,
    songsWritten,
    songsWithLyrics,
    derivedFrom: "recordings",
  }
}

async function resolveMbid(args: ImportArtistArgs): Promise<string> {
  if (args.mbid != null && args.mbid !== "") return args.mbid
  const name = args.name?.trim()
  if (name == null || name === "") {
    throw new Error("importArtistFromMusicBrainz requires either `name` or `mbid`")
  }
  const hits = await searchArtist(name)
  const best = pickBestArtist(hits, name)
  if (best == null) throw new Error(`No MusicBrainz artist found for "${name}"`)
  return best.id
}

export async function importArtistFromMusicBrainz(
  args: ImportArtistArgs
): Promise<ImportArtistResult> {
  const today = args.today

  const mbid = await resolveMbid(args)
  const artist = await getArtist(mbid)
  console.error(`Resolved artist: ${artist.name} (${mbid})`)

  const artistSlug = await landArtist(mbid, artist.name, extractGenres(artist), today)
  const catalogue = await readCatalogue()
  console.error(
    `Catalogue holds ${catalogue.taken.size} songs; naming new ones under \`${artistSlug}\``
  )

  const allWorks = await browseWorks(mbid)
  const songWorks = allWorks.filter(isSongWork)

  if (songWorks.length === 0) {
    return await importFromRecordings({
      mbid,
      artistName: artist.name,
      artistSlug,
      catalogue,
      today,
      limit: args.limit,
    })
  }

  const works = args.limit != null ? songWorks.slice(0, args.limit) : songWorks
  console.error(
    `Found ${allWorks.length} works, ${songWorks.length} songs; importing ${works.length}…`
  )

  const recordings = await browseArtistRecordings(mbid)
  const performed = performedWorkIds(recordings)
  console.error(`Browsed ${recordings.length} recordings → ${performed.size} performed works`)

  let songsWritten = 0
  let songsWithLyrics = 0
  for (const work of works) {
    const values = mbWorkToSongProps({
      work,
      artistSlug,
      artistMbid: mbid,
      performed: performed.has(work.id),
      today,
    })
    const name = nameForSong(catalogue, artistSlug, work.title, work.id)
    if (await landSong(name, values, work.title, artist.name)) songsWithLyrics += 1
    songsWritten += 1
    if (songsWritten % 25 === 0) console.error(`  …${songsWritten}/${works.length}`)
  }

  console.error(`Lyrics found for ${songsWithLyrics}/${works.length} songs`)
  return {
    mbid,
    artistName: artist.name,
    artistSlug,
    songsTotal: works.length,
    songsWritten,
    songsWithLyrics,
    derivedFrom: "works",
  }
}
