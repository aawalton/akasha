import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const rockapellaHowBoutNow = {
  id: "01a0676a-d720-706c-90f7-f6527b9a2e01",
  type: "page-type/release",
  slug: "rockapella-how-bout-now",
  title: "How Bout Now?",
  partOfCollections: ["artist/rockapella"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2017-11-22",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2Lt3jYZgJm1pMYMVHD1aiF",
      externalLink: "https://open.spotify.com/album/2Lt3jYZgJm1pMYMVHD1aiF",
    },
  ],
  createdAt: "2026-09-03T13:17:30.272Z",
  updatedAt: "2026-09-24T21:00:29.000Z",
} as const satisfies Release
