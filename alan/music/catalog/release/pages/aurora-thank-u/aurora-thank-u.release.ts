import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const auroraThankU = {
  id: "01a0676a-d72c-700f-897c-77c659514a1c",
  type: "page-type/release",
  slug: "aurora-thank-u",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/aurora"],
  position: 0,
  publishedAt: "2020-10-23",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4xTL6WvU1XquiSZ1ibPHyB",
      externalLink: "https://open.spotify.com/album/4xTL6WvU1XquiSZ1ibPHyB",
    },
  ],
  title: "Thank U",
} as const satisfies Release
