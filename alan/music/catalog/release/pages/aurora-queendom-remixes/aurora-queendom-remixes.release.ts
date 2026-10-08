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
  createdAt: "2026-09-03T13:17:30.279Z",
  updatedAt: "2026-09-21T16:45:29.000Z",
} as const satisfies Release
