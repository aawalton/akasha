import type { Song } from "../../song.page-type.ts"

export const auroraCureForMe = {
  id: "019ea4a3-e0c0-7437-935b-7f04d41893dc",
  pageTypeSlug: "song",
  slug: "aurora-cure-for-me",
  title: "Cure for Me",
  artistSlug: "aurora",
  externalId: "26e94c71-aed5-4aaa-86c1-d5dca29a9415",
  externalLink: "https://musicbrainz.org/work/26e94c71-aed5-4aaa-86c1-d5dca29a9415",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
