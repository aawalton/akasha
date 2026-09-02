import type { Song } from "../../song.page-type.ts"

export const siaGetMe = {
  id: "019ea4c6-da16-7e3d-8f3f-befd1ffb0993",
  pageTypeSlug: "song",
  slug: "sia-get-me",
  title: "Get Me",
  artistSlug: "sia",
  externalId: "0e9f4c8e-6054-45c3-8cd4-2928f2ce799d",
  externalLink: "https://musicbrainz.org/work/0e9f4c8e-6054-45c3-8cd4-2928f2ce799d",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
