import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const girlInRedTwoQueensInAKingSizedBed = {
  id: "01a0b724-d459-7e18-882f-24ad0a26d3a3",
  type: "page-type/song",
  slug: "girl-in-red-two-queens-in-a-king-sized-bed",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "aa442c25-dc62-4b75-ac45-594cc51cfadb",
      externalLink: "https://musicbrainz.org/work/aa442c25-dc62-4b75-ac45-594cc51cfadb",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "two queens in a king sized bed",
  artist: "artist/girl-in-red",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
