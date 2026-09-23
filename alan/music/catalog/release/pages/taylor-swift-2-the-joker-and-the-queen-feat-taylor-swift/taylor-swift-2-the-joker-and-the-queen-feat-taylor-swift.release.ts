import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const taylorSwift2TheJokerAndTheQueenFeatTaylorSwift = {
  id: "01a0676a-d72d-702b-86f1-65ee735fcd88",
  type: "page-type/release",
  slug: "taylor-swift-2-the-joker-and-the-queen-feat-taylor-swift",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/taylor-swift"],
  position: 0,
  publishedAt: "2022-02-11",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0vkAczpFKCazPKaoLtnBr0",
      externalLink: "https://open.spotify.com/album/0vkAczpFKCazPKaoLtnBr0",
    },
  ],
  title: "The Joker And The Queen (feat. Taylor Swift)",
} as const satisfies Release
