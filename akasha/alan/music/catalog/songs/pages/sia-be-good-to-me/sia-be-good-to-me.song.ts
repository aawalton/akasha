import type { Song } from "../../song.page-type.ts"

export const siaBeGoodToMe = {
  id: "019ea4c5-863f-7dd6-add1-c2ea7f69eca1",
  pageTypeSlug: "song",
  slug: "sia-be-good-to-me",
  title: "Be Good to Me",
  artistSlug: "sia",
  externalId: "bc3d1f6c-97f7-48dc-a39a-3483ab55b020",
  externalLink: "https://musicbrainz.org/work/bc3d1f6c-97f7-48dc-a39a-3483ab55b020",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
