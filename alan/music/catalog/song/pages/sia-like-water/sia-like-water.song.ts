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
} as const satisfies Song
