import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const zaraLarssonEscape = {
  id: "019ea4a1-caac-7004-9d71-984625532537",
  type: "page-type/song",
  slug: "zara-larsson-escape",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "d7d08db7-d499-47ca-8a3c-6b15ecd9174f",
      externalLink: "https://musicbrainz.org/work/d7d08db7-d499-47ca-8a3c-6b15ecd9174f",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Escape",
  artist: "artist/zara-larsson",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-06-08T00:28:47.148Z",
  updatedAt: "2026-09-19T18:27:41.000Z",
} as const satisfies Song
