import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const taylorSwift2ICanDoItWithABrokenHeart = {
  id: "01a0676a-d721-7004-a18e-3ff1a710f9ca",
  type: "page-type/release",
  slug: "taylor-swift-2-i-can-do-it-with-a-broken-heart",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/taylor-swift"],
  position: 0,
  publishedAt: "2024-07-16",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3yVqF1TOg60hk9ehgMj3na",
      externalLink: "https://open.spotify.com/album/3yVqF1TOg60hk9ehgMj3na",
    },
  ],
  title: "I Can Do It With a Broken Heart",
} as const satisfies Release
