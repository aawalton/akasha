import type { Value } from "@shared/pages-query"
import type { MbArtist, MbArtistSearchHit, MbRecording, MbWork } from "./schemas"

export type Written = "solo" | "collab"

export type SongType = "original" | "derivative"

const WRITER_REL_TYPES: ReadonlySet<string> = new Set(["writer", "composer", "lyricist"])
const VERSION_REL_TYPES: ReadonlySet<string> = new Set([
  "other version",
  "based on",
  "translated version",
])

const VERSION_KEYWORD_RE =
  /\b(?:remix|live|acoustic|stripped|version|instrumental|demo|remaster|edit|mix)\b/i
const BRACKETED_SEGMENT_RE = /[([]([^)\]]*)[)\]]/g

const MUSICBRAINZ_BASE = "https://musicbrainz.org"
const DEFAULT_MAX_GENRES = 8

function normalize(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
}

export function artistExternalLink(mbid: string): string {
  return `${MUSICBRAINZ_BASE}/artist/${mbid}`
}

export function workExternalLink(mbid: string): string {
  return `${MUSICBRAINZ_BASE}/work/${mbid}`
}

export function recordingExternalLink(mbid: string): string {
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

export function deriveSongType(work: MbWork, written: Written | null): SongType {
  if (written === null) return "derivative"
  const isAlternateVersion = work.relations.some(
    (rel) =>
      rel["target-type"] === "work" &&
      rel.direction === "backward" &&
      VERSION_REL_TYPES.has(rel.type)
  )
  return isAlternateVersion ? "derivative" : "original"
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

export function mbArtistToProps(args: {
  readonly mbid: string
  readonly name: string
  readonly genres: readonly string[]
  readonly today: string
}): Record<string, Value> {
  return {
    title: args.name,
    "external-id": args.mbid,
    "external-link": artistExternalLink(args.mbid),
    source: "musicbrainz",
    genre: [...args.genres],
    "last-synced-at": args.today,
  }
}

export function mbWorkToSongProps(args: {
  readonly work: MbWork
  readonly artistSlug: string
  readonly artistMbid: string
  readonly performed: boolean
  readonly today: string
}): Record<string, Value> {
  const written = deriveWritten(args.work, args.artistMbid)
  const songType = deriveSongType(args.work, written)
  return {
    title: args.work.title,
    "external-id": args.work.id,
    "external-link": workExternalLink(args.work.id),
    source: "musicbrainz",
    ...(written != null ? { written } : {}),
    performed: args.performed,
    "song-type": songType,
    "artist-slug": args.artistSlug,
    "last-synced-at": args.today,
  }
}

export function deriveSongTypeFromTitle(title: string): SongType {
  for (const match of title.matchAll(BRACKETED_SEGMENT_RE)) {
    const segment = match[1]
    if (segment != null && VERSION_KEYWORD_RE.test(segment)) return "derivative"
  }
  return "original"
}

export function dedupeRecordings(
  recordings: readonly MbRecording[]
): readonly { readonly title: string; readonly recordingId: string }[] {
  const groups = new Map<string, { title: string; recordingId: string }>()
  for (const rec of recordings) {
    const title = rec.title
    if (title == null || title.trim() === "") continue
    const key = normalize(title)
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

export function mbRecordingToSongProps(args: {
  readonly title: string
  readonly recordingId: string
  readonly artistSlug: string
  readonly today: string
}): Record<string, Value> {
  return {
    title: args.title,
    "external-id": args.recordingId,
    "external-link": recordingExternalLink(args.recordingId),
    source: "musicbrainz",
    performed: true,
    "song-type": deriveSongTypeFromTitle(args.title),
    "artist-slug": args.artistSlug,
    "last-synced-at": args.today,
  }
}
