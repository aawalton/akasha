import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaSnowman = {
  id: "019ea4cd-1247-773e-b10d-ff901d7b7d40",
  type: "page-type/song",
  slug: "sia-snowman",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "8bf233e5-34a6-48b1-839b-0766fe32c666",
      externalLink: "https://musicbrainz.org/work/8bf233e5-34a6-48b1-839b-0766fe32c666",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Snowman",
  artist: "artist/sia",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
