import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jessicaBaioRadio = {
  id: "019ea4f8-9627-75eb-b6dd-8ae49bc57a1f",
  type: "page-type/song",
  slug: "jessica-baio-radio",
  title: "Radio",
  artist: "artist/jessica-baio",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "af005ffe-1b47-4c2d-84dc-e5a80615d774",
      externalLink: "https://musicbrainz.org/recording/af005ffe-1b47-4c2d-84dc-e5a80615d774",
      lastSyncedAt: "2026-06-08",
    },
  ],
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-06-08T02:03:35.335Z",
  updatedAt: "2026-09-19T18:27:18.000Z",
} as const satisfies Song
