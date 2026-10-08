import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeTattooedHeart = {
  id: "019ea4e4-2835-75bb-ae9a-f393f8499d61",
  type: "page-type/song",
  slug: "ariana-grande-tattooed-heart",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "17553fc0-8152-4548-8510-b6e3872e6254",
      externalLink: "https://musicbrainz.org/work/17553fc0-8152-4548-8510-b6e3872e6254",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Tattooed Heart",
  artist: "artist/ariana-grande",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-06-08T01:41:16.469Z",
  updatedAt: "2026-09-19T18:27:18.000Z",
} as const satisfies Song
