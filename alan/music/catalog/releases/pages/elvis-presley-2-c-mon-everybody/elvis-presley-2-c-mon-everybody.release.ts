import type { Release } from "akasha/alan/music/catalog/releases/release.page-type.types.ts"

export const elvisPresley2CMonEverybody = {
  id: "01a0676a-d719-7050-8e9e-5ec9880e2cae",
  type: "release",
  slug: "elvis-presley-2-c-mon-everybody",
  title: "C'mon Everybody",
  partOfCollections: ["artist/elvis-presley"],
  position: 0,
  ownLength: 23.0979,
  ownProgress: 23.0979,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "1971-07-01",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1qEWLQtbtSfa051tA3jJQ5",
      externalLink: "https://open.spotify.com/album/1qEWLQtbtSfa051tA3jJQ5",
    },
  ],
} as const satisfies Release
