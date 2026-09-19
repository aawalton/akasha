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
  songType: "original",
  performed: true,
  written: "collab",
} as const satisfies Song
