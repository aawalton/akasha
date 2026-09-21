import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const auroraQueendomRemixes = {
  id: "01a0676a-d727-703b-926d-7530ea1d3190",
  type: "page-type/release",
  slug: "aurora-queendom-remixes",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/aurora"],
  position: 0,
  publishedAt: "2018-06-29",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2rU4EzAu1medA9WOI3zDle",
      externalLink: "https://open.spotify.com/album/2rU4EzAu1medA9WOI3zDle",
    },
  ],
  title: "Queendom (Remixes)",
} as const satisfies Release
