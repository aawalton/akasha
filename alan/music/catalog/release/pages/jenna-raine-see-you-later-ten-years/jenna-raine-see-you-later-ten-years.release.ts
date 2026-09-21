import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const jennaRaineSeeYouLaterTenYears = {
  id: "01a0676a-d728-705e-947e-b313712d807a",
  type: "page-type/release",
  slug: "jenna-raine-see-you-later-ten-years",
  grade: "B",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/jenna-raine"],
  position: 0,
  publishedAt: "2021-09-24",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6RQzi0RPigwT6Y75lVTtYv",
      externalLink: "https://open.spotify.com/album/6RQzi0RPigwT6Y75lVTtYv",
    },
  ],
  title: "see you later (ten years)",
} as const satisfies Release
