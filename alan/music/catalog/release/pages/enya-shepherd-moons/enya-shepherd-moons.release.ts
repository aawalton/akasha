import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const enyaShepherdMoons = {
  id: "01a0676a-d728-7072-be25-5a8b86a60331",
  type: "page-type/release",
  slug: "enya-shepherd-moons",
  title: "Shepherd Moons",
  partOfCollections: ["artist/enya"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "1991-11-15",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6ZuPbMe6CvQKl1nvAy0nZm",
      externalLink: "https://open.spotify.com/album/6ZuPbMe6CvQKl1nvAy0nZm",
    },
  ],
  createdAt: "2026-09-03T13:17:30.280Z",
  updatedAt: "2026-10-17T14:01:01.286Z",
} as const satisfies Release
