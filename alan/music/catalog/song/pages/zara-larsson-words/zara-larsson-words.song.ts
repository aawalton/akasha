import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const zaraLarssonWords = {
  id: "019ea49f-0fd6-71c1-8a18-a5455793a37f",
  type: "page-type/song",
  slug: "zara-larsson-words",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "45dc502d-159e-4db2-8868-399656c7d61c",
      externalLink: "https://musicbrainz.org/work/45dc502d-159e-4db2-8868-399656c7d61c",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Words",
  artist: "artist/zara-larsson",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
