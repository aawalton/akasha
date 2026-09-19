import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaElectricBird = {
  id: "019ea4c6-2cfb-7eb5-9a3b-343c05fdfb67",
  type: "page-type/song",
  slug: "sia-electric-bird",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "db2f8b36-b3d4-4d0b-a2e8-97ba1510fa32",
      externalLink: "https://musicbrainz.org/work/db2f8b36-b3d4-4d0b-a2e8-97ba1510fa32",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Electric Bird",
  artist: "artist/sia",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
