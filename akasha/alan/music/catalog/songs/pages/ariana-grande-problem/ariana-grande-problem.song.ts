import type { Song } from "../../song.page-type.ts"

export const arianaGrandeProblem = {
  id: "019ea4e4-3669-74ac-9fc3-8c2ab620141b",
  pageTypeSlug: "song",
  slug: "ariana-grande-problem",
  title: "Problem",
  artistSlug: "ariana-grande",
  externalId: "2078d63c-69ad-4696-8e04-82ef6735a669",
  externalLink: "https://musicbrainz.org/work/2078d63c-69ad-4696-8e04-82ef6735a669",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
