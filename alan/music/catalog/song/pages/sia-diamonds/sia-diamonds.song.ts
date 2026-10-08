import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaDiamonds = {
  id: "019ea4c3-cf41-7a06-a5ad-3f940ab3a0e4",
  type: "page-type/song",
  slug: "sia-diamonds",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "51ecbcfc-5b83-408e-b8dd-905f842967bf",
      externalLink: "https://musicbrainz.org/work/51ecbcfc-5b83-408e-b8dd-905f842967bf",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Diamonds",
  artist: "artist/sia",
  performed: true,
  written: "collab",
  createdAt: "2026-06-08T01:05:56.545Z",
  updatedAt: "2026-09-19T18:27:41.000Z",
} as const satisfies Song
