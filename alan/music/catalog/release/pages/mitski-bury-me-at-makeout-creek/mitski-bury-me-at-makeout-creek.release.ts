import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const mitskiBuryMeAtMakeoutCreek = {
  id: "01a0676a-d719-7046-8add-f1f5cd27162d",
  type: "page-type/release",
  slug: "mitski-bury-me-at-makeout-creek",
  title: "Bury Me At Makeout Creek",
  partOfCollections: ["artist/mitski"],
  position: 0,
  ownLength: 30.311067,
  ownProgress: 30.311067,
  unit: "unit/minutes",
  status: "completed",
  grade: "C",
  publishedAt: "2014-11-11",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3I2KkX13lHXuYqfBjSOopo",
      externalLink: "https://open.spotify.com/album/3I2KkX13lHXuYqfBjSOopo",
    },
  ],
} as const satisfies Release
