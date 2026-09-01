import type { Value } from "@shared/pages-query"
import type { LrclibRecord } from "./schemas"

const LYRICS_SOURCE = "lrclib"

function normalize(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
}

function hasLyrics(record: LrclibRecord): boolean {
  return (
    (record.plainLyrics != null && record.plainLyrics !== "") ||
    (record.syncedLyrics != null && record.syncedLyrics !== "")
  )
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
  const synced = qualifying.find((r) => r.syncedLyrics != null && r.syncedLyrics !== "")
  return synced ?? qualifying[0] ?? null
}

export function lyricsToProps(record: LrclibRecord): Record<string, Value> {
  const props: Record<string, Value> = { "lyrics-source": LYRICS_SOURCE }
  if (record.plainLyrics != null && record.plainLyrics !== "") props.lyrics = record.plainLyrics
  if (record.syncedLyrics != null && record.syncedLyrics !== "") {
    props["synced-lyrics"] = record.syncedLyrics
  }
  return props
}
