import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const zaraLarssonBlueMoon = {
  id: "019ea4a0-3a78-70ce-9460-1926c3157bb5",
  type: "page-type/song",
  slug: "zara-larsson-blue-moon",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "851c2c67-affd-44ed-bab9-e1f7ac7b26d6",
      externalLink: "https://musicbrainz.org/work/851c2c67-affd-44ed-bab9-e1f7ac7b26d6",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Blue Moon",
  artist: "artist/zara-larsson",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
