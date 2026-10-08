import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaMoon = {
  id: "019ea4c9-55fc-74b1-8809-86ee77e27298",
  type: "page-type/song",
  slug: "sia-moon",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "99ca2f42-d7a1-4ac3-b374-288e67fdba7e",
      externalLink: "https://musicbrainz.org/work/99ca2f42-d7a1-4ac3-b374-288e67fdba7e",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Moon",
  artist: "artist/sia",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-06-08T01:11:58.716Z",
  updatedAt: "2026-09-19T18:27:41.000Z",
} as const satisfies Song
