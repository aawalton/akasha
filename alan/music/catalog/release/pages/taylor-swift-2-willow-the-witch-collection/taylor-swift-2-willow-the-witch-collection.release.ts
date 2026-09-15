import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const taylorSwift2WillowTheWitchCollection = {
  id: "01a0676a-d731-7024-9ffa-1bcf9d499090",
  type: "release",
  slug: "taylor-swift-2-willow-the-witch-collection",
  title: "willow (the witch collection)",
  partOfCollections: ["artist/taylor-swift"],
  position: 0,
  ownLength: 13.7174,
  ownProgress: 13.7174,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2020-12-16",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6WzAiEDGTU7KmEyGwLpBXB",
      externalLink: "https://open.spotify.com/album/6WzAiEDGTU7KmEyGwLpBXB",
    },
  ],
} as const satisfies Release
