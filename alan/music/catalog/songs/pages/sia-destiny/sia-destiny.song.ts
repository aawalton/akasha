import type { Song } from "../../song.page-type.ts"

export const siaDestiny = {
  id: "019ea4c5-8f56-759d-95c4-d11d9df85979",
  pageTypeSlug: "song",
  slug: "sia-destiny",
  title: "Destiny",
  artistSlug: "sia",
  externalId: "bca7440c-8c45-4c7d-9e44-b7d0e82ddbdc",
  externalLink: "https://musicbrainz.org/work/bca7440c-8c45-4c7d-9e44-b7d0e82ddbdc",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
