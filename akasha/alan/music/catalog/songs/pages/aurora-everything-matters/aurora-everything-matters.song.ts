import type { Song } from "../../song.page-type.ts"

export const auroraEverythingMatters = {
  id: "019ea4a4-02e4-7399-bd6d-a9ecbaf6c94e",
  pageTypeSlug: "song",
  slug: "aurora-everything-matters",
  title: "Everything Matters",
  artistSlug: "aurora",
  externalId: "2fdf2dff-5f8a-460a-a9a8-0fcc717e04d7",
  externalLink: "https://musicbrainz.org/work/2fdf2dff-5f8a-460a-a9a8-0fcc717e04d7",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
