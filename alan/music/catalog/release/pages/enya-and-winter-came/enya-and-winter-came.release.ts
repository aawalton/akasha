import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const enyaAndWinterCame = {
  id: "01a0676a-d717-701b-8a70-4aabaff9c0fa",
  type: "page-type/release",
  slug: "enya-and-winter-came",
  title: "And Winter Came...",
  partOfCollections: ["artist/enya"],
  position: 0,
  ownLength: 48.96318333333333,
  ownProgress: 48.963183,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2008-11-10",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2CemN34rnpp6wrCFJo555S",
      externalLink: "https://open.spotify.com/album/2CemN34rnpp6wrCFJo555S",
    },
  ],
  createdAt: "2026-09-03T13:17:30.263Z",
  updatedAt: "2026-10-17T13:47:13.085Z",
} as const satisfies Release
