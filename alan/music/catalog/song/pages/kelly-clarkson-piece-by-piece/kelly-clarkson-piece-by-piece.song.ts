import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const kellyClarksonPieceByPiece = {
  id: "019ea4b1-5ac5-719f-828b-19e502142596",
  type: "page-type/song",
  slug: "kelly-clarkson-piece-by-piece",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "0a1a605e-936c-4e74-a53b-d783eb4649b8",
      externalLink: "https://musicbrainz.org/work/0a1a605e-936c-4e74-a53b-d783eb4649b8",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Piece by Piece",
  artist: "artist/kelly-clarkson",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
