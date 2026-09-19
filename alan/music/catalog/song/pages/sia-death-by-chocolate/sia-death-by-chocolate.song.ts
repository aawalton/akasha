import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaDeathByChocolate = {
  id: "019ea4c6-632a-7a7a-a7e8-213906ba96cf",
  type: "page-type/song",
  slug: "sia-death-by-chocolate",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "f616bca6-7d4e-4ca2-83d8-ac226745f03d",
      externalLink: "https://musicbrainz.org/work/f616bca6-7d4e-4ca2-83d8-ac226745f03d",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Death by Chocolate",
  artist: "artist/sia",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
