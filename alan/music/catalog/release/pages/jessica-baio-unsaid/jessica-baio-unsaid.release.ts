import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const jessicaBaioUnsaid = {
  id: "01a0676a-d72f-7045-b7b2-53b76610859e",
  type: "page-type/release",
  slug: "jessica-baio-unsaid",
  title: "UNSAID",
  partOfCollections: ["artist/jessica-baio"],
  position: 0,
  ownLength: 29.7313,
  ownProgress: 29.7313,
  unit: "unit/minutes",
  status: "completed",
  grade: "A",
  publishedAt: "2024-11-01",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6qymOSCWulOMM6D7LxuZtl",
      externalLink: "https://open.spotify.com/album/6qymOSCWulOMM6D7LxuZtl",
    },
  ],
} as const satisfies Release
