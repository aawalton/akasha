import type { Song } from "../../song.page-type.ts"

export const arianaGrandeDecember = {
  id: "019ea4e3-9c43-7ceb-a0fa-2599ce05f163",
  pageTypeSlug: "song",
  slug: "ariana-grande-december",
  title: "December",
  artistSlug: "ariana-grande",
  externalId: "e12e4481-e944-4810-921c-3cb9b3fd946c",
  externalLink: "https://musicbrainz.org/work/e12e4481-e944-4810-921c-3cb9b3fd946c",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
