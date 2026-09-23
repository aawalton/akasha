import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const taylorSwift2TheTaylorSwiftHolidayCollection = {
  id: "01a0676a-d72e-7014-91cc-d30a842b7b3b",
  type: "page-type/release",
  slug: "taylor-swift-2-the-taylor-swift-holiday-collection",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/taylor-swift"],
  position: 0,
  publishedAt: "2008-12-02",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7vzYp7FrKnTRoktBYsx9SF",
      externalLink: "https://open.spotify.com/album/7vzYp7FrKnTRoktBYsx9SF",
    },
  ],
  title: "The Taylor Swift Holiday Collection",
} as const satisfies Release
