import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const elvisPresley2ElvisCountry = {
  id: "01a0676a-d71c-706e-a77c-ea779ef85219",
  type: "page-type/release",
  slug: "elvis-presley-2-elvis-country",
  title: "Elvis Country",
  partOfCollections: ["artist/elvis-presley"],
  position: 0,
  ownLength: 38.945967,
  ownProgress: 38.945967,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "1971-01-02",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5nFIESxbIeBxoREzNMzzbN",
      externalLink: "https://open.spotify.com/album/5nFIESxbIeBxoREzNMzzbN",
    },
  ],
  createdAt: "2026-09-03T13:17:30.268Z",
  updatedAt: "2026-09-15T16:35:10.000Z",
} as const satisfies Release
