import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const jamesTaylor2WalkingMan2019Remaster = {
  id: "01a0676a-d730-7014-a46b-922f9960def9",
  type: "page-type/release",
  slug: "james-taylor-2-walking-man-2019-remaster",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/james-taylor"],
  position: 0,
  publishedAt: "1974-06-01",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1pa0QvYjLsiYWQlkMvqPZL",
      externalLink: "https://open.spotify.com/album/1pa0QvYjLsiYWQlkMvqPZL",
    },
  ],
  title: "Walking Man (2019 Remaster)",
} as const satisfies Release
