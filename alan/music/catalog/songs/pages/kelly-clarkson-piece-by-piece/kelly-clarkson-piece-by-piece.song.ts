import type { Song } from "../../song.page-type.ts"

export const kellyClarksonPieceByPiece = {
  id: "019ea4b1-5ac5-719f-828b-19e502142596",
  pageTypeSlug: "song",
  slug: "kelly-clarkson-piece-by-piece",
  title: "Piece by Piece",
  artistSlug: "kelly-clarkson",
  externalId: "0a1a605e-936c-4e74-a53b-d783eb4649b8",
  externalLink: "https://musicbrainz.org/work/0a1a605e-936c-4e74-a53b-d783eb4649b8",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
