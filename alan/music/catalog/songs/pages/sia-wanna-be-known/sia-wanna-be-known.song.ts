import type { Song } from "../../song.page-type.ts"

export const siaWannaBeKnown = {
  id: "019ea4cb-5a1d-73a9-99ee-c6c3e68f8066",
  pageTypeSlug: "song",
  slug: "sia-wanna-be-known",
  title: "Wanna Be Known",
  artistSlug: "sia",
  externalId: "272780a0-72e0-4ba5-a5cd-6df68477e1af",
  externalLink: "https://musicbrainz.org/work/272780a0-72e0-4ba5-a5cd-6df68477e1af",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
