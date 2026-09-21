import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const chaislynShadesOfPink = {
  id: "01a0676a-d728-7069-8d53-b507d8d8f6d4",
  type: "page-type/release",
  slug: "chaislyn-shades-of-pink",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/chaislyn"],
  position: 0,
  publishedAt: "2021-02-11",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0Un5mXCszpRHXq2w3bqNWl",
      externalLink: "https://open.spotify.com/album/0Un5mXCszpRHXq2w3bqNWl",
    },
  ],
  title: "Shades of Pink",
} as const satisfies Release
