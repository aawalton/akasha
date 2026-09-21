import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const jennaRaineNen = {
  id: "01a0676a-d725-7044-83c5-b3f859a76f92",
  type: "page-type/release",
  slug: "jenna-raine-nen",
  grade: "B",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/jenna-raine"],
  position: 0,
  publishedAt: "2019-01-25",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2GhUeFUXPOWOodE64FyA82",
      externalLink: "https://open.spotify.com/album/2GhUeFUXPOWOodE64FyA82",
    },
  ],
  title: "nen",
} as const satisfies Release
