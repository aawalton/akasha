import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const jennaRaineStupidCupid = {
  id: "01a0676a-d72a-7037-b394-09c3c7bff6dc",
  type: "page-type/release",
  slug: "jenna-raine-stupid-cupid",
  title: "Stupid Cupid",
  partOfCollections: ["artist/jenna-raine"],
  position: 0,
  ownLength: 2.899233,
  ownProgress: 2.899233,
  unit: "unit/minutes",
  status: "completed",
  grade: "B",
  publishedAt: "2023-03-17",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5L3H6uXdvsSUkgSZTeU3fv",
      externalLink: "https://open.spotify.com/album/5L3H6uXdvsSUkgSZTeU3fv",
    },
  ],
} as const satisfies Release
