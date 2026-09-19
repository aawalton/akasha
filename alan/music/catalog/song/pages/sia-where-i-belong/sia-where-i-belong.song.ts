import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaWhereIBelong = {
  id: "019ea4cd-0bf7-7eac-b08c-c40755e32e4e",
  type: "page-type/song",
  slug: "sia-where-i-belong",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "890b8894-41e9-4552-9ede-349a5c00347a",
      externalLink: "https://musicbrainz.org/work/890b8894-41e9-4552-9ede-349a5c00347a",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Where I Belong",
  artist: "artist/sia",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
