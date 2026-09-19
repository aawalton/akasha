import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const zaraLarssonSaturnSReturn = {
  id: "019ea49f-fca2-7780-bb45-32235aa6b17e",
  type: "page-type/song",
  slug: "zara-larsson-saturn-s-return",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "71020844-88d8-46d9-bfcb-52846f0593e9",
      externalLink: "https://musicbrainz.org/work/71020844-88d8-46d9-bfcb-52846f0593e9",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Saturn’s Return",
  artist: "artist/zara-larsson",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
