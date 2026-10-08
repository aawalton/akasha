import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const taylorSwift2FearlessPlatinumEdition = {
  id: "01a0676a-d71d-706b-9c8d-454758d7070b",
  type: "page-type/release",
  slug: "taylor-swift-2-fearless-platinum-edition",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/taylor-swift"],
  position: 0,
  publishedAt: "2008-11-11",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "43OpbkiiIxJO8ktIB777Nn",
      externalLink: "https://open.spotify.com/album/43OpbkiiIxJO8ktIB777Nn",
    },
  ],
  title: "Fearless Platinum Edition",
  createdAt: "2026-09-03T13:17:30.269Z",
  updatedAt: "2026-09-23T14:01:20.000Z",
} as const satisfies Release
