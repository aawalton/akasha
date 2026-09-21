import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const coldplayARushOfBloodToTheHead = {
  id: "01a0676a-d715-703d-b121-10d3e8029558",
  type: "page-type/release",
  slug: "coldplay-a-rush-of-blood-to-the-head",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/coldplay"],
  position: 0,
  publishedAt: "2002-08-27",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0RHX9XECH8IVI3LNgWDpmQ",
      externalLink: "https://open.spotify.com/album/0RHX9XECH8IVI3LNgWDpmQ",
    },
  ],
  title: "A Rush of Blood to the Head",
} as const satisfies Release
