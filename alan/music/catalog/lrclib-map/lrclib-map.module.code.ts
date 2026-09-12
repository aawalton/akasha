import type { LrclibRecord } from "akasha/alan/music/catalog/lrclib-schema/lrclib-schema.module.code.ts"
import type { LyricsSource } from "akasha/alan/music/catalog/songs/properties/lyrics-source.text-property.types.ts"
import { compareKey } from "akasha/utils/narrow/modules/compare-key/compare-key.module.code.ts"

export type SongLyrics = {
  readonly lyricsSource: LyricsSource
  readonly lyrics: string | null
  readonly syncedLyrics: string | null
}

const LYRICS_SOURCE = "lrclib"

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
  const wantTitle = compareKey(title)
  const wantArtist = compareKey(artistName)
  const qualifying = records.filter(
    (r) =>
      !r.instrumental &&
      hasLyrics(r) &&
      compareKey(r.trackName) === wantTitle &&
      compareKey(r.artistName).includes(wantArtist)
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
