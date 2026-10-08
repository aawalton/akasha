import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const justinTimberlakeInnocent = {
  id: "01a0676a-d721-7075-9890-925c6142f451",
  type: "page-type/release",
  slug: "justin-timberlake-innocent",
  title: "Innocent",
  partOfCollections: ["artist/justin-timberlake"],
  position: 0,
  ownLength: 2.889017,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2021-06-24",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "72LhQh2TSGItWp5RHLg8sL",
      externalLink: "https://open.spotify.com/album/72LhQh2TSGItWp5RHLg8sL",
    },
  ],
  createdAt: "2026-09-03T13:17:30.273Z",
  updatedAt: "2026-09-15T16:37:02.000Z",
} as const satisfies Release
