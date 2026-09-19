import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaJudgeMe = {
  id: "019ea4c7-c60a-783c-a382-51c483d8ab06",
  type: "page-type/song",
  slug: "sia-judge-me",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "566fa28c-02c6-4c9e-8295-94cba28a9fae",
      externalLink: "https://musicbrainz.org/work/566fa28c-02c6-4c9e-8295-94cba28a9fae",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Judge Me",
  artist: "artist/sia",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
