import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaLikeWater = {
  id: "019ea4c9-e8a7-7825-ad6f-1fffe8a395e6",
  type: "page-type/song",
  slug: "sia-like-water",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "cad88818-826b-4cc2-952e-de2d2bba084e",
      externalLink: "https://musicbrainz.org/work/cad88818-826b-4cc2-952e-de2d2bba084e",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Like Water",
  artist: "artist/sia",
  performed: false,
  written: "collab",
  createdAt: "2026-06-08T01:12:36.263Z",
  updatedAt: "2026-09-19T18:27:41.000Z",
} as const satisfies Song
