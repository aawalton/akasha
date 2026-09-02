import type { Song } from "../../song.page-type.ts"

export const siaRainbow = {
  id: "019ea4cc-cb50-7d41-aab6-0651c5c421bb",
  pageTypeSlug: "song",
  slug: "sia-rainbow",
  title: "Rainbow",
  artistSlug: "sia",
  externalId: "7b7982cf-d8f0-4cdb-bb56-334c4a753265",
  externalLink: "https://musicbrainz.org/work/7b7982cf-d8f0-4cdb-bb56-334c4a753265",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
