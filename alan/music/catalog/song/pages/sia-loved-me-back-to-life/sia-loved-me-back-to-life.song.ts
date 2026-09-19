import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaLovedMeBackToLife = {
  id: "019ea4c9-8641-77fd-889e-4a98d162f251",
  type: "page-type/song",
  slug: "sia-loved-me-back-to-life",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "a9fb8a68-3fb1-4a95-bff5-618ab9a5ca46",
      externalLink: "https://musicbrainz.org/work/a9fb8a68-3fb1-4a95-bff5-618ab9a5ca46",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Loved Me Back to Life",
  artist: "artist/sia",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
