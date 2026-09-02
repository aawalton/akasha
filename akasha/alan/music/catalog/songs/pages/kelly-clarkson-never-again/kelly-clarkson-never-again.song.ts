import type { Song } from "../../song.page-type.ts"

export const kellyClarksonNeverAgain = {
  id: "019ea4af-904a-797a-998c-4b704aaf1ed5",
  pageTypeSlug: "song",
  slug: "kelly-clarkson-never-again",
  title: "Never Again",
  artistSlug: "kelly-clarkson",
  externalId: "9af4a4d3-3b01-4a01-8d0a-0cb5dcdede8a",
  externalLink: "https://musicbrainz.org/work/9af4a4d3-3b01-4a01-8d0a-0cb5dcdede8a",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
