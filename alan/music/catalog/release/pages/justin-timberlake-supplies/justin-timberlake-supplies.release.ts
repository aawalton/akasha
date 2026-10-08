import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const justinTimberlakeSupplies = {
  id: "01a0676a-d72a-704a-837b-a7cb8883de77",
  type: "page-type/release",
  slug: "justin-timberlake-supplies",
  title: "Supplies",
  partOfCollections: ["artist/justin-timberlake"],
  position: 0,
  ownLength: 3.76,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2018-01-18",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0kO76uncDF4puhrLgtszIy",
      externalLink: "https://open.spotify.com/album/0kO76uncDF4puhrLgtszIy",
    },
  ],
  createdAt: "2026-09-03T13:17:30.282Z",
  updatedAt: "2026-09-15T16:37:02.000Z",
} as const satisfies Release
