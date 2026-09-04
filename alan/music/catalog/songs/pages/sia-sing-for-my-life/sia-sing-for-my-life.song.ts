import type { Song } from "../../song.page-type.ts"

export const siaSingForMyLife = {
  id: "019ea4ce-76d5-7aa9-ad9f-c16c742761ea",
  pageTypeSlug: "song",
  slug: "sia-sing-for-my-life",
  title: "Sing for My Life",
  artistSlug: "sia",
  externalId: "e6c9d0b0-3ec5-41e2-9b97-7e28f463ad1b",
  externalLink: "https://musicbrainz.org/work/e6c9d0b0-3ec5-41e2-9b97-7e28f463ad1b",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
