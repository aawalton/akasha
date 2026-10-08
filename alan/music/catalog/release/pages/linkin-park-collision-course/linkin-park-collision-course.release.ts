import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const linkinParkCollisionCourse = {
  id: "01a0676a-d71b-7010-bf8d-ee0c1d1f1c40",
  type: "page-type/release",
  slug: "linkin-park-collision-course",
  title: "Collision Course",
  partOfCollections: ["artist/linkin-park"],
  position: 0,
  ownLength: 21.302633,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2004-01-01",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5NH94cATqx5fjBE794xZLy",
      externalLink: "https://open.spotify.com/album/5NH94cATqx5fjBE794xZLy",
    },
  ],
  createdAt: "2026-09-03T13:17:30.267Z",
  updatedAt: "2026-09-15T16:37:53.000Z",
} as const satisfies Release
