import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const nickelCreek2Strangers = {
  id: "01a0676a-d72a-702c-82e5-0fd21c2fe02a",
  type: "page-type/release",
  slug: "nickel-creek-2-strangers",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/nickel-creek"],
  position: 0,
  publishedAt: "2023-01-24",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0Ko043n4FVz0uor1vl7fmK",
      externalLink: "https://open.spotify.com/album/0Ko043n4FVz0uor1vl7fmK",
    },
  ],
  title: "Strangers",
} as const satisfies Release
