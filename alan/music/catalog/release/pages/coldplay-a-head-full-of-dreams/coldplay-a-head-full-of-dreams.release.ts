import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const coldplayAHeadFullOfDreams = {
  id: "01a0676a-d715-7029-b888-03c1139a9338",
  type: "page-type/release",
  slug: "coldplay-a-head-full-of-dreams",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/coldplay"],
  position: 0,
  publishedAt: "2015-12-04",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3cfAM8b8KqJRoIzt3zLKqw",
      externalLink: "https://open.spotify.com/album/3cfAM8b8KqJRoIzt3zLKqw",
    },
  ],
  title: "A Head Full of Dreams",
} as const satisfies Release
