import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const jennaRaineINeedYou = {
  id: "01a0676a-d721-703a-a0f4-541ba3b0281d",
  type: "page-type/release",
  slug: "jenna-raine-i-need-you",
  grade: "B",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/jenna-raine"],
  position: 0,
  publishedAt: "2022-06-17",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6bFQ2urrYQJa8Lg22brndp",
      externalLink: "https://open.spotify.com/album/6bFQ2urrYQJa8Lg22brndp",
    },
  ],
  title: "I Need You",
} as const satisfies Release
