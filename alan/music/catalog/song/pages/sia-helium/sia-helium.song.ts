import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaHelium = {
  id: "019ea4c7-95fd-7fa7-9065-45c7f2d1cafd",
  type: "page-type/song",
  slug: "sia-helium",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "409a4e77-d377-4b6c-acf8-0c29fcd6e8dc",
      externalLink: "https://musicbrainz.org/work/409a4e77-d377-4b6c-acf8-0c29fcd6e8dc",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Helium",
  artist: "artist/sia",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-06-08T01:10:04.029Z",
  updatedAt: "2026-09-19T18:27:41.000Z",
} as const satisfies Song
