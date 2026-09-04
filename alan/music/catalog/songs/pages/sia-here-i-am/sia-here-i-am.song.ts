import type { Song } from "../../song.page-type.ts"

export const siaHereIAm = {
  id: "019ea4c8-2a60-7ddc-89ca-1636a24475d2",
  pageTypeSlug: "song",
  slug: "sia-here-i-am",
  title: "Here I Am",
  artistSlug: "sia",
  externalId: "6c1abc82-4682-4666-a7fc-3031c76d4113",
  externalLink: "https://musicbrainz.org/work/6c1abc82-4682-4666-a7fc-3031c76d4113",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
