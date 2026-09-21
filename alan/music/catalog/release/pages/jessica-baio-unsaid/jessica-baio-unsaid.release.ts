import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const jessicaBaioUnsaid = {
  id: "01a0676a-d72f-7045-b7b2-53b76610859e",
  type: "page-type/release",
  slug: "jessica-baio-unsaid",
  grade: "A",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/jessica-baio"],
  position: 0,
  publishedAt: "2024-11-01",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6qymOSCWulOMM6D7LxuZtl",
      externalLink: "https://open.spotify.com/album/6qymOSCWulOMM6D7LxuZtl",
    },
  ],
  title: "UNSAID",
} as const satisfies Release
