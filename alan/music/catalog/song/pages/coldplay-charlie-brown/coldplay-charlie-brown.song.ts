import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplayCharlieBrown = {
  id: "01a0ba5d-47fa-788f-a2ae-6c65ace9eaa3",
  type: "page-type/song",
  slug: "coldplay-charlie-brown",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "d9f1f42e-b67b-4c35-bb12-cdb0efe5a110",
      externalLink: "https://musicbrainz.org/work/d9f1f42e-b67b-4c35-bb12-cdb0efe5a110",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Charlie Brown",
  artist: "artist/coldplay",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-09-19T15:51:10.586Z",
  updatedAt: "2026-09-19T16:18:26.000Z",
} as const satisfies Song
