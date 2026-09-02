import type { Song } from "../../song.page-type.ts"

export const arianaGrandeNobody = {
  id: "019ea4e8-2c27-79e7-9990-b78ca91c39c1",
  pageTypeSlug: "song",
  slug: "ariana-grande-nobody",
  title: "Nobody",
  artistSlug: "ariana-grande",
  externalId: "ec77fa28-b3a5-4211-a33c-1d78160f57a1",
  externalLink: "https://musicbrainz.org/work/ec77fa28-b3a5-4211-a33c-1d78160f57a1",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
