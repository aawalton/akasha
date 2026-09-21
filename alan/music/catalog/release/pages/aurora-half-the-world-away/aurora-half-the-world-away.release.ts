import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const auroraHalfTheWorldAway = {
  id: "01a0676a-d71f-7037-8051-36a97a55e022",
  type: "page-type/release",
  slug: "aurora-half-the-world-away",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/aurora"],
  position: 0,
  publishedAt: "2015-07-11",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0oqYmoUfMV93LzLxIzN3IF",
      externalLink: "https://open.spotify.com/album/0oqYmoUfMV93LzLxIzN3IF",
    },
  ],
  title: "Half the World Away",
} as const satisfies Release
