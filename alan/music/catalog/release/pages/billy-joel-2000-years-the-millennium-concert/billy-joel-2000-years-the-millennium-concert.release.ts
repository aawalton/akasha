import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const billyJoel2000YearsTheMillenniumConcert = {
  id: "01a0676a-d714-7021-b7fa-ff4996285f6b",
  type: "page-type/release",
  slug: "billy-joel-2000-years-the-millennium-concert",
  title: "2000 Years - The Millennium Concert",
  partOfCollections: ["artist/billy-joel"],
  position: 0,
  ownLength: 128.806533,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2000-05-02",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1Cd4dgqPV6aG4cuYVpJR6L",
      externalLink: "https://open.spotify.com/album/1Cd4dgqPV6aG4cuYVpJR6L",
    },
  ],
  createdAt: "2026-09-03T13:17:30.260Z",
  updatedAt: "2026-09-15T16:34:19.000Z",
} as const satisfies Release
