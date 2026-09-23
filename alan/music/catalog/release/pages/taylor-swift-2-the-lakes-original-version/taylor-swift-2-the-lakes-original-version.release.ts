import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const taylorSwift2TheLakesOriginalVersion = {
  id: "01a0676a-d72d-702f-9e11-0e430970a98b",
  type: "page-type/release",
  slug: "taylor-swift-2-the-lakes-original-version",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/taylor-swift"],
  position: 0,
  publishedAt: "2021-07-24",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "40cMfQDrBCDmOaWZuNEmKq",
      externalLink: "https://open.spotify.com/album/40cMfQDrBCDmOaWZuNEmKq",
    },
  ],
  title: "the lakes (original version)",
} as const satisfies Release
