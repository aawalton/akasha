import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplayInTheSun = {
  id: "01a0ba5d-3c25-78e0-9152-bb0dc19fb3dd",
  type: "page-type/song",
  slug: "coldplay-in-the-sun",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "3d1f73a1-3ce8-49d3-86b7-8c8376edee1b",
      externalLink: "https://musicbrainz.org/work/3d1f73a1-3ce8-49d3-86b7-8c8376edee1b",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "In the Sun",
  artist: "artist/coldplay",
  songType: "derivative",
  performed: true,
} as const satisfies Song
