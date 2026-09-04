import type { Song } from "../../song.page-type.ts"

export const siaBornYesterday = {
  id: "019ea4c2-ea8f-7b3d-9c81-67c004965fb1",
  pageTypeSlug: "song",
  slug: "sia-born-yesterday",
  title: "Born Yesterday",
  artistSlug: "sia",
  externalId: "171a4b01-e71b-41a7-be86-c966bff6e40c",
  externalLink: "https://musicbrainz.org/work/171a4b01-e71b-41a7-be86-c966bff6e40c",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
