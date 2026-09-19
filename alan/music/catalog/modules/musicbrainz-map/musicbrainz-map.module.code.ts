import { idFrom } from "akasha/alan/collection/external/modules/external-identity-reading/external-identity-reading.module.code.ts"
import type { Artist } from "akasha/alan/music/catalog/artist/artist.page-type.types.ts"
import type {
  MbArtist,
  MbArtistSearchHit,
  MbRecording,
  MbWork,
} from "akasha/alan/music/catalog/modules/musicbrainz-schema/musicbrainz-schema.module.code.ts"
import type { Written } from "akasha/alan/music/catalog/song/properties/written.select-property.types.ts"
import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"
import { compareKey } from "akasha/code/type/narrowing/modules/compare-key/compare-key.module.code.ts"
import type { Value } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"

export type ArtistFields = Pick<Artist, "title" | "genre">

export type ArtistIdentity = NonNullable<Artist["externalIdentity"]>[number]

export type SongFields = Pick<
  Song,
  "title" | "artist" | "externalIdentity" | "performed" | "written"
>

export type DistinctRecording = {
  readonly title: string
  readonly recordingId: string
}

const SOURCE = "musicbrainz"

const ARTIST = "artist"

function artistAddressOf(artistSlug: string): string {
  return `${ARTIST}/${artistSlug}`
}

const WRITER_REL_TYPES: ReadonlySet<string> = new Set(["writer", "composer", "lyricist"])

const MUSICBRAINZ_BASE = "https://musicbrainz.org"

const DEFAULT_MAX_GENRES = 8

function artistExternalLink(mbid: string): string {
  return `${MUSICBRAINZ_BASE}/artist/${mbid}`
}

function workExternalLink(mbid: string): string {
  return `${MUSICBRAINZ_BASE}/work/${mbid}`
}

function recordingExternalLink(mbid: string): string {
  return `${MUSICBRAINZ_BASE}/recording/${mbid}`
}

export function pickBestArtist(
  hits: readonly MbArtistSearchHit[],
  query: string
): MbArtistSearchHit | undefined {
  const normalizedQuery = query.trim().toLowerCase()
  const scoreOf = (hit: MbArtistSearchHit): number => hit.score ?? 0
  let best: MbArtistSearchHit | undefined
  for (const hit of hits) {
    if (best === undefined) {
      best = hit
      continue
    }
    const isExact = hit.name.trim().toLowerCase() === normalizedQuery
    const bestExact = best.name.trim().toLowerCase() === normalizedQuery
    if (isExact && !bestExact) {
      best = hit
      continue
    }
    if (isExact === bestExact && scoreOf(hit) > scoreOf(best)) {
      best = hit
    }
  }
  return best
}

export function extractGenres(
  artist: MbArtist,
  max: number = DEFAULT_MAX_GENRES
): readonly string[] {
  return [...artist.genres]
    .sort((a, b) => (b.count ?? 0) - (a.count ?? 0))
    .slice(0, max)
    .map((g) => g.name)
}

export function isSongWork(work: MbWork): boolean {
  return work.type == null || work.type === "Song"
}

export function deriveWritten(work: MbWork, artistMbid: string): Written | null {
  const writerIds = new Set<string>()
  for (const rel of work.relations) {
    if (rel["target-type"] === "artist" && WRITER_REL_TYPES.has(rel.type) && rel.artist != null) {
      writerIds.add(rel.artist.id)
    }
  }
  if (!writerIds.has(artistMbid)) return null
  return writerIds.size <= 1 ? "solo" : "collab"
}

export function performedWorkIds(recordings: readonly MbRecording[]): ReadonlySet<string> {
  const ids = new Set<string>()
  for (const rec of recordings) {
    for (const rel of rec.relations) {
      if (rel["target-type"] === "work" && rel.type === "performance" && rel.work != null) {
        ids.add(rel.work.id)
      }
    }
  }
  return ids
}

export function dedupeRecordings(recordings: readonly MbRecording[]): readonly DistinctRecording[] {
  const groups = new Map<string, DistinctRecording>()
  for (const rec of recordings) {
    const title = rec.title
    if (title == null || title.trim() === "") continue
    const key = compareKey(title)
    if (key === "") continue
    const existing = groups.get(key)
    if (existing == null || rec.id < existing.recordingId) {
      groups.set(key, { title, recordingId: rec.id })
    }
  }
  return [...groups.entries()]
    .sort((a, b) => (a[0] < b[0] ? -1 : a[0] > b[0] ? 1 : 0))
    .map(([, entry]) => entry)
}

export function mbArtistToFields(args: {
  readonly name: string
  readonly genres: readonly string[]
}): ArtistFields {
  return {
    title: args.name,
    genre: [...args.genres],
  }
}

export function mbArtistIdentity(args: {
  readonly mbid: string
  readonly today: string
}): ArtistIdentity {
  return {
    source: SOURCE,
    externalId: args.mbid,
    externalLink: artistExternalLink(args.mbid),
    lastSyncedAt: args.today,
  }
}

export function identityHeld(held: unknown, mbid: string): boolean {
  if (Array.isArray(held)) {
    return held.some(
      (one) =>
        typeof one === "object" &&
        one !== null &&
        (one as ArtistIdentity).source === SOURCE &&
        (one as ArtistIdentity).externalId === mbid
    )
  }
  return false
}

export function mbWorkToSongFields(args: {
  readonly work: MbWork
  readonly artistSlug: string
  readonly artistMbid: string
  readonly performed: boolean
  readonly today: string
}): SongFields {
  const written = deriveWritten(args.work, args.artistMbid)
  return {
    title: args.work.title,
    artist: artistAddressOf(args.artistSlug),
    externalIdentity: [
      {
        source: SOURCE,
        externalId: args.work.id,
        externalLink: workExternalLink(args.work.id),
        lastSyncedAt: args.today,
      },
    ],
    performed: args.performed,
    ...(written != null ? { written } : {}),
  }
}

export function mbRecordingToSongFields(args: {
  readonly title: string
  readonly recordingId: string
  readonly artistSlug: string
  readonly today: string
}): SongFields {
  return {
    title: args.title,
    artist: artistAddressOf(args.artistSlug),
    externalIdentity: [
      {
        source: SOURCE,
        externalId: args.recordingId,
        externalLink: recordingExternalLink(args.recordingId),
        lastSyncedAt: args.today,
      },
    ],
    performed: true,
  }
}

export function songIdIn(fields: SongFields): string | null {
  return idFrom(fields.externalIdentity, SOURCE)
}

const JUDGED = ["written"] as const

export function songValuesOver(held: Value, fields: SongFields): Value {
  const rest: Value = { ...held }
  for (const key of JUDGED) delete rest[key]
  return { ...rest, ...fields }
}
