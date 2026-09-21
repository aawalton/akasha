import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const jessicaBaioWhatAreYouAfraidOf = {
  id: "01a0676a-d730-7040-994d-98b77753d0ff",
  type: "page-type/release",
  slug: "jessica-baio-what-are-you-afraid-of",
  grade: "B",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/jessica-baio"],
  position: 0,
  publishedAt: "2024-09-13",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "07mGocNty3EMxeXCnRVCnk",
      externalLink: "https://open.spotify.com/album/07mGocNty3EMxeXCnRVCnk",
    },
  ],
  title: "what are you afraid of?",
} as const satisfies Release
