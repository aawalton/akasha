import type { Song } from "../../song.page-type.ts"

export const siaReaper = {
  id: "019ea4cb-4242-71e4-90c9-323d4ae0e5ff",
  pageTypeSlug: "song",
  slug: "sia-reaper",
  title: "Reaper",
  artistSlug: "sia",
  externalId: "26a2e610-11e2-4afc-9d82-c6ba55cdcaa4",
  externalLink: "https://musicbrainz.org/work/26a2e610-11e2-4afc-9d82-c6ba55cdcaa4",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
