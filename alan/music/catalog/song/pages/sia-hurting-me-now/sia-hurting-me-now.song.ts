import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaHurtingMeNow = {
  id: "019ea4c8-e7f4-774a-9d8a-e9d2b3820604",
  type: "page-type/song",
  slug: "sia-hurting-me-now",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "8a3b24f0-8eac-49e7-96e3-c519cb1a3acd",
      externalLink: "https://musicbrainz.org/work/8a3b24f0-8eac-49e7-96e3-c519cb1a3acd",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Hurting Me Now",
  artist: "artist/sia",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
