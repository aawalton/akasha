import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const enyaTheCelts = {
  id: "01a0676a-d72c-703c-8013-505ca3c9b9a3",
  type: "page-type/release",
  slug: "enya-the-celts",
  title: "The Celts",
  partOfCollections: ["artist/enya"],
  position: 0,
  ownLength: 10.7171,
  ownProgress: 10.7171,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "1992-01-01",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5Sr25USvQk6hOtWRN8Xs2R",
      externalLink: "https://open.spotify.com/album/5Sr25USvQk6hOtWRN8Xs2R",
    },
  ],
  createdAt: "2026-09-03T13:17:30.284Z",
  updatedAt: "2026-09-15T16:35:36.000Z",
} as const satisfies Release
