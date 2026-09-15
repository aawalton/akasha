import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeSupernatural2 = {
  id: "019ea4e6-3fc3-7ba0-b12f-b00bb70e4686",
  type: "page-type/song",
  slug: "ariana-grande-supernatural-2",
  title: "supernatural",
  artist: "artist/ariana-grande",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "8814f734-3e59-4ce8-8cac-856bcfa7b0d0",
      externalLink: "https://musicbrainz.org/work/8814f734-3e59-4ce8-8cac-856bcfa7b0d0",
      lastSyncedAt: "2026-06-08",
    },
  ],
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
