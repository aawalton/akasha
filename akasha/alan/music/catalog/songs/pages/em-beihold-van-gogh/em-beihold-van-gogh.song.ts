import type { Song } from "../../song.page-type.ts"

export const emBeiholdVanGogh = {
  id: "019ea4df-78f1-7bc4-a7d2-81bc4ccf3ce8",
  pageTypeSlug: "song",
  slug: "em-beihold-van-gogh",
  title: "Van Gogh",
  artistSlug: "em-beihold",
  externalId: "ba60d3e5-fc85-4672-ba3d-6fed55ee9e2f",
  externalLink: "https://musicbrainz.org/work/ba60d3e5-fc85-4672-ba3d-6fed55ee9e2f",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
