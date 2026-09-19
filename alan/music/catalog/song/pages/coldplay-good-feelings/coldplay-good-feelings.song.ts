import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplayGoodFeelings = {
  id: "01a0ba5d-490f-7853-94c7-a700fac822be",
  type: "page-type/song",
  slug: "coldplay-good-feelings",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "e23ec7fa-2db2-4ea2-b8d6-d043bfe0c461",
      externalLink: "https://musicbrainz.org/work/e23ec7fa-2db2-4ea2-b8d6-d043bfe0c461",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "GOOD FEELiNGS",
  artist: "artist/coldplay",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
