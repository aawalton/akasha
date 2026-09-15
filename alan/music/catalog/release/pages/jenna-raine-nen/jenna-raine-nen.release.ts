import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const jennaRaineNen = {
  id: "01a0676a-d725-7044-83c5-b3f859a76f92",
  type: "release",
  slug: "jenna-raine-nen",
  title: "nen",
  partOfCollections: ["artist/jenna-raine"],
  position: 0,
  ownLength: 16.971583,
  ownProgress: 16.971583,
  unit: "unit/minutes",
  status: "completed",
  rank: "B",
  publishedAt: "2019-01-25",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2GhUeFUXPOWOodE64FyA82",
      externalLink: "https://open.spotify.com/album/2GhUeFUXPOWOodE64FyA82",
    },
  ],
} as const satisfies Release
