import type { Song } from "../../song.page-type.ts"

export const siaAngelByTheWings = {
  id: "019ea4c5-9aae-7a4a-b7b4-6dfa5e667662",
  pageTypeSlug: "song",
  slug: "sia-angel-by-the-wings",
  title: "Angel by the Wings",
  artistSlug: "sia",
  externalId: "bd735f3b-94cc-45c6-b124-791b293f1f14",
  externalLink: "https://musicbrainz.org/work/bd735f3b-94cc-45c6-b124-791b293f1f14",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
