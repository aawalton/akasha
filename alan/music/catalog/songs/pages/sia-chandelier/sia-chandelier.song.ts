import type { Song } from "../../song.page-type.ts"

export const siaChandelier = {
  id: "019ea4c4-f9e0-7306-8c74-4dd8eca30736",
  pageTypeSlug: "song",
  slug: "sia-chandelier",
  title: "Chandelier",
  artistSlug: "sia",
  externalId: "9ad070d4-83e9-4404-9444-64ad5de092fa",
  externalLink: "https://musicbrainz.org/work/9ad070d4-83e9-4404-9444-64ad5de092fa",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
