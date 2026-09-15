import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const clairoBags = {
  id: "01a0676a-d718-7010-b0e5-2b4cfd020c2a",
  type: "release",
  slug: "clairo-bags",
  title: "Bags",
  partOfCollections: ["artist/clairo"],
  position: 0,
  ownLength: 4.341983,
  ownProgress: 4.341983,
  unit: "unit/minutes",
  status: "completed",
  rank: "B",
  publishedAt: "2019-05-24",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5DOj6Si38rUhxAqGK0zlaY",
      externalLink: "https://open.spotify.com/album/5DOj6Si38rUhxAqGK0zlaY",
    },
  ],
} as const satisfies Release
