import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaOblivion = {
  id: "019ea4c9-8d07-74ea-9912-305a3c82346a",
  type: "page-type/song",
  slug: "sia-oblivion",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "ad083a46-176d-4e07-b8ee-c0592cc43b81",
      externalLink: "https://musicbrainz.org/work/ad083a46-176d-4e07-b8ee-c0592cc43b81",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Oblivion",
  artist: "artist/sia",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
