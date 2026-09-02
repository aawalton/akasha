import type { LrclibRecord } from "../lrclib-schema/lrclib-schema.module.code.ts"
import type { LyricsSource } from "../songs/properties/lyrics-source.text-property.ts"

export type SongLyrics = {
  readonly lyricsSource: LyricsSource
  readonly lyrics: string | null
  readonly syncedLyrics: string | null
}

const LYRICS_SOURCE = "lrclib"

function normalize(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
}

function textOrNull(held: string | null | undefined): string | null {
  return held != null && held !== "" ? held : null
}

function hasLyrics(record: LrclibRecord): boolean {
  return textOrNull(record.plainLyrics) != null || textOrNull(record.syncedLyrics) != null
}

export function pickBestLyrics(
  records: readonly LrclibRecord[],
  title: string,
  artistName: string
): LrclibRecord | null {
  const wantTitle = normalize(title)
  const wantArtist = normalize(artistName)
  const qualifying = records.filter(
    (r) =>
      !r.instrumental &&
      hasLyrics(r) &&
      normalize(r.trackName) === wantTitle &&
      normalize(r.artistName).includes(wantArtist)
  )
  if (qualifying.length === 0) return null
  const synced = qualifying.find((r) => textOrNull(r.syncedLyrics) != null)
  return synced ?? qualifying[0] ?? null
}

export function lyricsFieldsOf(record: LrclibRecord): SongLyrics {
  return {
    lyricsSource: LYRICS_SOURCE,
    lyrics: textOrNull(record.plainLyrics),
    syncedLyrics: textOrNull(record.syncedLyrics),
  }
}
