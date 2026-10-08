import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const billyJoelLiveThroughTheYears = {
  id: "01a0676a-d723-7056-ae4c-da9418043288",
  type: "page-type/release",
  slug: "billy-joel-live-through-the-years",
  title: "Live Through the Years",
  partOfCollections: ["artist/billy-joel"],
  position: 0,
  ownLength: 93.373517,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2019-05-03",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "17p560iAs05C7Nlvgd2jHq",
      externalLink: "https://open.spotify.com/album/17p560iAs05C7Nlvgd2jHq",
    },
  ],
  createdAt: "2026-09-03T13:17:30.275Z",
  updatedAt: "2026-09-15T16:34:19.000Z",
} as const satisfies Release
