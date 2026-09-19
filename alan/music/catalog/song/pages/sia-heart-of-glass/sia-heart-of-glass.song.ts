import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaHeartOfGlass = {
  id: "019ea4c7-cde8-7820-a4c1-77f666c508ad",
  type: "page-type/song",
  slug: "sia-heart-of-glass",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "57906be4-d4a4-4d17-a44d-e1dd081daafd",
      externalLink: "https://musicbrainz.org/work/57906be4-d4a4-4d17-a44d-e1dd081daafd",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Heart of Glass",
  artist: "artist/sia",
  songType: "original",
  performed: false,
  written: "collab",
} as const satisfies Song
