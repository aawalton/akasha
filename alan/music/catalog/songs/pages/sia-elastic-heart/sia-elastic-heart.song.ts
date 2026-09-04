import type { Song } from "../../song.page-type.ts"

export const siaElasticHeart = {
  id: "019ea4c3-0e1d-78a3-895f-0bd31605d79e",
  pageTypeSlug: "song",
  slug: "sia-elastic-heart",
  title: "Elastic Heart",
  artistSlug: "sia",
  externalId: "19d264df-da69-4a70-8778-2f55ff5a9f4c",
  externalLink: "https://musicbrainz.org/work/19d264df-da69-4a70-8778-2f55ff5a9f4c",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
