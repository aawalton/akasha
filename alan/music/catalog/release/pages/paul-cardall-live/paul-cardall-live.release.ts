import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const paulCardallLive = {
  id: "01a0676a-d723-703c-81fe-1c06b72b3ca3",
  type: "page-type/release",
  slug: "paul-cardall-live",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/paul-cardall"],
  position: 0,
  publishedAt: "2004-05-04",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2fnSyOTSrgEmbbI9mxNgsD",
      externalLink: "https://open.spotify.com/album/2fnSyOTSrgEmbbI9mxNgsD",
    },
  ],
  title: "Live",
} as const satisfies Release
