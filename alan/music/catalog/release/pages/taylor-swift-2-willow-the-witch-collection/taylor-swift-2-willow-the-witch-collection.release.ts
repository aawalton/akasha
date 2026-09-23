import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const taylorSwift2WillowTheWitchCollection = {
  id: "01a0676a-d731-7024-9ffa-1bcf9d499090",
  type: "page-type/release",
  slug: "taylor-swift-2-willow-the-witch-collection",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/taylor-swift"],
  position: 0,
  publishedAt: "2020-12-16",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6WzAiEDGTU7KmEyGwLpBXB",
      externalLink: "https://open.spotify.com/album/6WzAiEDGTU7KmEyGwLpBXB",
    },
  ],
  title: "willow (the witch collection)",
} as const satisfies Release
