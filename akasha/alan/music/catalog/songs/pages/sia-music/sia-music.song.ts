import type { Song } from "../../song.page-type.ts"

export const siaMusic = {
  id: "019ea4c7-7a2a-7c43-8495-4b6900dbcc78",
  pageTypeSlug: "song",
  slug: "sia-music",
  title: "Music",
  artistSlug: "sia",
  externalId: "3ebb530e-9ed0-4c95-bff8-626afa76477d",
  externalLink: "https://musicbrainz.org/work/3ebb530e-9ed0-4c95-bff8-626afa76477d",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
