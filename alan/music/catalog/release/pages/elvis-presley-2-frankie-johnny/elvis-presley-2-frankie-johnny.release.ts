import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const elvisPresley2FrankieJohnny = {
  id: "01a0676a-d71e-7032-8f82-f428c49e5c32",
  type: "page-type/release",
  slug: "elvis-presley-2-frankie-johnny",
  title: "Frankie & Johnny",
  partOfCollections: ["artist/elvis-presley"],
  position: 0,
  ownLength: 26.479267,
  ownProgress: 26.479267,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "1966-01-01",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2yyCsy9h9vEepo2nrWSsjw",
      externalLink: "https://open.spotify.com/album/2yyCsy9h9vEepo2nrWSsjw",
    },
  ],
  createdAt: "2026-09-03T13:17:30.270Z",
  updatedAt: "2026-09-15T16:35:10.000Z",
} as const satisfies Release
