import type { Song } from "../../song.page-type.ts"

export const siaButtons = {
  id: "019ea4c3-e8e3-7d3e-85df-2ed7fe36462b",
  pageTypeSlug: "song",
  slug: "sia-buttons",
  title: "Buttons",
  artistSlug: "sia",
  externalId: "57f3ced5-cb40-4a92-9bca-39b2c1fce206",
  externalLink: "https://musicbrainz.org/work/57f3ced5-cb40-4a92-9bca-39b2c1fce206",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
