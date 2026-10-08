import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const billyJoelAnInnocentMan = {
  id: "01a0676a-d717-7011-baf3-9634953b1ee9",
  type: "page-type/release",
  slug: "billy-joel-an-innocent-man",
  title: "An Innocent Man",
  partOfCollections: ["artist/billy-joel"],
  position: 0,
  ownLength: 40.301717,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "1983-08-08",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3R3x4zIabsvpD3yxqLaUpc",
      externalLink: "https://open.spotify.com/album/3R3x4zIabsvpD3yxqLaUpc",
    },
  ],
  createdAt: "2026-09-03T13:17:30.263Z",
  updatedAt: "2026-09-15T16:34:19.000Z",
} as const satisfies Release
