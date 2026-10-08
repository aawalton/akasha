import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeSixThirty = {
  id: "019ea4e4-a34c-70d0-aa86-b4a24b0d3f8c",
  type: "page-type/song",
  slug: "ariana-grande-six-thirty",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "3bab5d21-bc9c-44a5-a6df-4945eb6f387c",
      externalLink: "https://musicbrainz.org/work/3bab5d21-bc9c-44a5-a6df-4945eb6f387c",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "six thirty",
  artist: "artist/ariana-grande",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-06-08T01:41:47.980Z",
  updatedAt: "2026-09-19T18:27:18.000Z",
} as const satisfies Song
