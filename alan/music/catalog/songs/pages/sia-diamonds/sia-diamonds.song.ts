import type { Song } from "../../song.page-type.ts"

export const siaDiamonds = {
  id: "019ea4c3-cf41-7a06-a5ad-3f940ab3a0e4",
  pageTypeSlug: "song",
  slug: "sia-diamonds",
  title: "Diamonds",
  artistSlug: "sia",
  externalId: "51ecbcfc-5b83-408e-b8dd-905f842967bf",
  externalLink: "https://musicbrainz.org/work/51ecbcfc-5b83-408e-b8dd-905f842967bf",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  written: "collab",
} as const satisfies Song
