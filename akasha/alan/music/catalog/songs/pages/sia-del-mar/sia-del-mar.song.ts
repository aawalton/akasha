import type { Song } from "../../song.page-type.ts"

export const siaDelMar = {
  id: "019ea4c3-5605-78cd-a751-041d186d0b13",
  pageTypeSlug: "song",
  slug: "sia-del-mar",
  title: "Del mar",
  artistSlug: "sia",
  externalId: "2baa81c4-5aff-4ee6-81c6-a7d8bdebfb6c",
  externalLink: "https://musicbrainz.org/work/2baa81c4-5aff-4ee6-81c6-a7d8bdebfb6c",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
