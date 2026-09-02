import type { Song } from "../../song.page-type.ts"

export const siaCloud = {
  id: "019ea4c3-fba2-727b-b26d-6f910646f625",
  pageTypeSlug: "song",
  slug: "sia-cloud",
  title: "Cloud",
  artistSlug: "sia",
  externalId: "6179061c-0320-493a-a856-4a6cdb7a45c9",
  externalLink: "https://musicbrainz.org/work/6179061c-0320-493a-a856-4a6cdb7a45c9",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
