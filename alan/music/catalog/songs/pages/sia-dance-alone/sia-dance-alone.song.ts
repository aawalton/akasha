import type { Song } from "../../song.page-type.ts"

export const siaDanceAlone = {
  id: "019ea4c4-6fc0-7a3a-879a-86961ee4c482",
  pageTypeSlug: "song",
  slug: "sia-dance-alone",
  title: "Dance Alone",
  artistSlug: "sia",
  externalId: "7f15e292-5ba6-40eb-8250-15564a87ff3e",
  externalLink: "https://musicbrainz.org/work/7f15e292-5ba6-40eb-8250-15564a87ff3e",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
