import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const elvisPresley2FunInAcapulco = {
  id: "01a0676a-d71e-7046-afba-3160beb154aa",
  type: "page-type/release",
  slug: "elvis-presley-2-fun-in-acapulco",
  title: "Fun in Acapulco",
  partOfCollections: ["artist/elvis-presley"],
  position: 0,
  ownLength: 29.6635,
  ownProgress: 29.6635,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "1963-11-15",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6HKnyw3DYCaD1wdmzez463",
      externalLink: "https://open.spotify.com/album/6HKnyw3DYCaD1wdmzez463",
    },
  ],
  createdAt: "2026-09-03T13:17:30.270Z",
  updatedAt: "2026-09-15T16:35:10.000Z",
} as const satisfies Release
