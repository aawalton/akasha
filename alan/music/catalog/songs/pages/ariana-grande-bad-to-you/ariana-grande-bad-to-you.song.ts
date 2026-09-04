import type { Song } from "../../song.page-type.ts"

export const arianaGrandeBadToYou = {
  id: "019ea4e0-ebb5-7975-853b-6c9f83b13ad9",
  pageTypeSlug: "song",
  slug: "ariana-grande-bad-to-you",
  title: "Bad to You",
  artistSlug: "ariana-grande",
  externalId: "3650e75c-6c93-48dc-a685-264dabdd8ed4",
  externalLink: "https://musicbrainz.org/work/3650e75c-6c93-48dc-a685-264dabdd8ed4",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
