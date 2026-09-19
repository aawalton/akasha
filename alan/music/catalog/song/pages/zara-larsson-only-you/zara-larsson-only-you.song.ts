import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const zaraLarssonOnlyYou = {
  id: "019ea4a1-a9ae-7b85-afc4-f2fbeed16035",
  type: "page-type/song",
  slug: "zara-larsson-only-you",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "d35db7a6-f7c2-4003-9ebf-40f41f214c11",
      externalLink: "https://musicbrainz.org/work/d35db7a6-f7c2-4003-9ebf-40f41f214c11",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Only You",
  artist: "artist/zara-larsson",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
