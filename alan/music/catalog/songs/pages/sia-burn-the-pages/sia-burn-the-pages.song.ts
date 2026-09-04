import type { Song } from "../../song.page-type.ts"

export const siaBurnThePages = {
  id: "019ea4c5-735b-736d-ba70-8ffb42ed92e8",
  pageTypeSlug: "song",
  slug: "sia-burn-the-pages",
  title: "Burn the Pages",
  artistSlug: "sia",
  externalId: "b7da8e9e-b9ee-4391-8063-808a76699aa3",
  externalLink: "https://musicbrainz.org/work/b7da8e9e-b9ee-4391-8063-808a76699aa3",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
