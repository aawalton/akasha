import type { Song } from "../../song.page-type.ts"

export const siaUnforgettable = {
  id: "019ea4cb-fb29-7251-9486-5a0c747b7b6b",
  pageTypeSlug: "song",
  slug: "sia-unforgettable",
  title: "Unforgettable",
  artistSlug: "sia",
  externalId: "3ee29e3d-b17e-38dc-b5ed-47b1a039c1be",
  externalLink: "https://musicbrainz.org/work/3ee29e3d-b17e-38dc-b5ed-47b1a039c1be",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
