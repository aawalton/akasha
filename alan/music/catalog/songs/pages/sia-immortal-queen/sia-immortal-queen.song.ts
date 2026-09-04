import type { Song } from "../../song.page-type.ts"

export const siaImmortalQueen = {
  id: "019ea4c9-a61a-7af5-a3a8-b4dd73a3a5e6",
  pageTypeSlug: "song",
  slug: "sia-immortal-queen",
  title: "Immortal Queen",
  artistSlug: "sia",
  externalId: "b6777bf4-b8fc-40ad-9cc8-63fcf9bad78b",
  externalLink: "https://musicbrainz.org/work/b6777bf4-b8fc-40ad-9cc8-63fcf9bad78b",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
