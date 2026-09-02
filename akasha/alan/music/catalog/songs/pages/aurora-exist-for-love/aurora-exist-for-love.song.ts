import type { Song } from "../../song.page-type.ts"

export const auroraExistForLove = {
  id: "019ea4a5-adcc-7752-9e0a-faeac8887c32",
  pageTypeSlug: "song",
  slug: "aurora-exist-for-love",
  title: "Exist for Love",
  artistSlug: "aurora",
  externalId: "6c94292e-ad76-4396-99bf-e6367e8c12ea",
  externalLink: "https://musicbrainz.org/work/6c94292e-ad76-4396-99bf-e6367e8c12ea",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
