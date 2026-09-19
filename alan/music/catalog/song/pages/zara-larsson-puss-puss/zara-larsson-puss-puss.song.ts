import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const zaraLarssonPussPuss = {
  id: "019ea4a0-8220-73b8-973a-9481a2051943",
  type: "page-type/song",
  slug: "zara-larsson-puss-puss",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "96237dfe-36ca-44c1-9d2b-f1a39c983ed3",
      externalLink: "https://musicbrainz.org/work/96237dfe-36ca-44c1-9d2b-f1a39c983ed3",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Puss Puss",
  artist: "artist/zara-larsson",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
