import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const auroraForTheMetalPeople = {
  id: "01a0676a-d71e-7028-8325-f9459c77d694",
  type: "page-type/release",
  slug: "aurora-for-the-metal-people",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/aurora"],
  position: 0,
  publishedAt: "2021-03-04",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3wBRFm2OnYmxcXGCWHDf1T",
      externalLink: "https://open.spotify.com/album/3wBRFm2OnYmxcXGCWHDf1T",
    },
  ],
  title: "FOR THE METAL PEOPLE",
} as const satisfies Release
