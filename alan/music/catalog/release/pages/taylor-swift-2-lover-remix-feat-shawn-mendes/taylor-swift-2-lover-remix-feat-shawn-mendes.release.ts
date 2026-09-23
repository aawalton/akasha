import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const taylorSwift2LoverRemixFeatShawnMendes = {
  id: "01a0676a-d724-700c-a07d-6f3c352e954b",
  type: "page-type/release",
  slug: "taylor-swift-2-lover-remix-feat-shawn-mendes",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/taylor-swift"],
  position: 0,
  publishedAt: "2019-11-13",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2UfvnX1YYeC2cExMQTMbXC",
      externalLink: "https://open.spotify.com/album/2UfvnX1YYeC2cExMQTMbXC",
    },
  ],
  title: "Lover (Remix) [feat. Shawn Mendes]",
} as const satisfies Release
