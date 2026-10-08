import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jessicaBaioLoveMeLess = {
  id: "019ea4f8-1785-793d-8148-f9c61566633d",
  type: "page-type/song",
  slug: "jessica-baio-love-me-less",
  title: "love me less",
  artist: "artist/jessica-baio",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "e1b40c79-e5b7-4a54-808f-a5ec9a44de0c",
      externalLink: "https://musicbrainz.org/recording/e1b40c79-e5b7-4a54-808f-a5ec9a44de0c",
      lastSyncedAt: "2026-06-08",
    },
  ],
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-06-08T02:03:02.917Z",
  updatedAt: "2026-09-19T18:27:18.000Z",
} as const satisfies Song
