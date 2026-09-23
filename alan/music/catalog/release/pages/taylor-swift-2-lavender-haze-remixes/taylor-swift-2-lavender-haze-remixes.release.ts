import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const taylorSwift2LavenderHazeRemixes = {
  id: "01a0676a-d722-7064-a6f1-d0b854a5d6cc",
  type: "page-type/release",
  slug: "taylor-swift-2-lavender-haze-remixes",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/taylor-swift"],
  position: 0,
  publishedAt: "2023-03-03",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5LyzI39gkePgpHz38bEQIr",
      externalLink: "https://open.spotify.com/album/5LyzI39gkePgpHz38bEQIr",
    },
  ],
  title: "Lavender Haze (Remixes)",
} as const satisfies Release
