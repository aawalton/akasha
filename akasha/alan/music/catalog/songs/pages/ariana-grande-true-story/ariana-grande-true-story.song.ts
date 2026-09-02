import type { Song } from "../../song.page-type.ts"

export const arianaGrandeTrueStory = {
  id: "019ea4e6-b1bc-7279-aed5-1c2dbeadf57a",
  pageTypeSlug: "song",
  slug: "ariana-grande-true-story",
  title: "true story",
  artistSlug: "ariana-grande",
  externalId: "9e2e20d5-76a7-405e-a8ea-3f877d6c3485",
  externalLink: "https://musicbrainz.org/work/9e2e20d5-76a7-405e-a8ea-3f877d6c3485",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
