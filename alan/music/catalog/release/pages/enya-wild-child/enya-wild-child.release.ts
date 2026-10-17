import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const enyaWildChild = {
  id: "01a0676a-d731-701c-8d56-cbb73bbbaa26",
  type: "page-type/release",
  slug: "enya-wild-child",
  title: "Wild Child",
  partOfCollections: ["artist/enya"],
  position: 0,
  ownLength: 9.351533333333334,
  ownProgress: 9.351533,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2001-01-01",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6HN4o3fyMGoOQQKohvNjgQ",
      externalLink: "https://open.spotify.com/album/6HN4o3fyMGoOQQKohvNjgQ",
    },
  ],
  createdAt: "2026-09-03T13:17:30.289Z",
  updatedAt: "2026-10-17T13:47:13.085Z",
} as const satisfies Release
