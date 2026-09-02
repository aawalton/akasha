import type { Song } from "../../song.page-type.ts"

export const jessicaBaioMadeForYou = {
  id: "019ea4f8-2d3f-717f-b103-35f807a24e2e",
  pageTypeSlug: "song",
  slug: "jessica-baio-made-for-you",
  title: "made for you",
  artistSlug: "jessica-baio",
  externalId: "106b4105-5895-4d02-88b7-4f528617ba79",
  externalLink: "https://musicbrainz.org/recording/106b4105-5895-4d02-88b7-4f528617ba79",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
