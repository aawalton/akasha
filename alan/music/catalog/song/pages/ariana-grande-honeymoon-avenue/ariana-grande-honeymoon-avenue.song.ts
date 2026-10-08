import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeHoneymoonAvenue = {
  id: "019ea4e3-ca94-7d75-8d60-b38656f616ea",
  type: "page-type/song",
  slug: "ariana-grande-honeymoon-avenue",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "e529ab81-4565-45df-b5f4-5045ea3cf9e6",
      externalLink: "https://musicbrainz.org/work/e529ab81-4565-45df-b5f4-5045ea3cf9e6",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Honeymoon Avenue",
  artist: "artist/ariana-grande",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-06-08T01:40:52.500Z",
  updatedAt: "2026-09-19T16:44:14.000Z",
} as const satisfies Song
