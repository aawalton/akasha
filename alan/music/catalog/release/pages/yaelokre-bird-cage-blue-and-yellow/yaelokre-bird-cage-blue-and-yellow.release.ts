import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const yaelokreBirdCageBlueAndYellow = {
  id: "01a0676a-d719-7008-a982-361dd3fa133f",
  type: "page-type/release",
  slug: "yaelokre-bird-cage-blue-and-yellow",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/yaelokre"],
  position: 0,
  publishedAt: "2024-09-25",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1sQolI66l35OQFsJIZ3hH9",
      externalLink: "https://open.spotify.com/album/1sQolI66l35OQFsJIZ3hH9",
    },
  ],
  title: "Bird cage blue and yellow",
} as const satisfies Release
