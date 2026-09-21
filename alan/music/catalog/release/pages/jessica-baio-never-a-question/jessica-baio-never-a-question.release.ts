import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const jessicaBaioNeverAQuestion = {
  id: "01a0676a-d725-7045-b4ad-97bc02cf8682",
  type: "page-type/release",
  slug: "jessica-baio-never-a-question",
  grade: "B",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/jessica-baio"],
  position: 0,
  publishedAt: "2023-02-17",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2uisqUDEHFfUNrdwPFF3bn",
      externalLink: "https://open.spotify.com/album/2uisqUDEHFfUNrdwPFF3bn",
    },
  ],
  title: "never a question",
} as const satisfies Release
