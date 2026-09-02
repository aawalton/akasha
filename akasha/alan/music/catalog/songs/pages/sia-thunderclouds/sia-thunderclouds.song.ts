import type { Song } from "../../song.page-type.ts"

export const siaThunderclouds = {
  id: "019ea4cd-beb5-799a-a324-b5640eeabd79",
  pageTypeSlug: "song",
  slug: "sia-thunderclouds",
  title: "Thunderclouds",
  artistSlug: "sia",
  externalId: "b3111c24-2758-4f41-ba39-65a8e32c25a1",
  externalLink: "https://musicbrainz.org/work/b3111c24-2758-4f41-ba39-65a8e32c25a1",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
