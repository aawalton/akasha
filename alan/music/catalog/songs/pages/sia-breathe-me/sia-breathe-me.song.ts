import type { Song } from "../../song.page-type.ts"

export const siaBreatheMe = {
  id: "019ea4c6-49d6-71ad-bffe-33969fe63d8a",
  pageTypeSlug: "song",
  slug: "sia-breathe-me",
  title: "Breathe Me",
  artistSlug: "sia",
  externalId: "e9d630f1-998d-4ec6-86b6-a6b555bd16a7",
  externalLink: "https://musicbrainz.org/work/e9d630f1-998d-4ec6-86b6-a6b555bd16a7",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
