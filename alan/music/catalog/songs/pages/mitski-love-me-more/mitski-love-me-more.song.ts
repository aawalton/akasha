import type { Song } from "../../song.page-type.ts"

export const mitskiLoveMeMore = {
  id: "019f0ea1-008f-72d2-a0ba-4bd4bfa04893",
  pageTypeSlug: "song",
  slug: "mitski-love-me-more",
  title: "Love Me More",
  artistSlug: "mitski",
  externalId: "5e6fa672-9149-40a3-ad80-9995db2f960f",
  externalLink: "https://musicbrainz.org/work/5e6fa672-9149-40a3-ad80-9995db2f960f",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-28",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
