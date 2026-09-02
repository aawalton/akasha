import type { Song } from "../../song.page-type.ts"

export const siaJudgeMe = {
  id: "019ea4c7-c60a-783c-a382-51c483d8ab06",
  pageTypeSlug: "song",
  slug: "sia-judge-me",
  title: "Judge Me",
  artistSlug: "sia",
  externalId: "566fa28c-02c6-4c9e-8295-94cba28a9fae",
  externalLink: "https://musicbrainz.org/work/566fa28c-02c6-4c9e-8295-94cba28a9fae",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
