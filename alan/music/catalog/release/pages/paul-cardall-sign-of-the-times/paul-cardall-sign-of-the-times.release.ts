import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const paulCardallSignOfTheTimes = {
  id: "01a0676a-d729-7007-8a00-6a2bb1582225",
  type: "page-type/release",
  slug: "paul-cardall-sign-of-the-times",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/paul-cardall"],
  position: 0,
  publishedAt: "2017-06-23",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4SBy8zVCZXxPgVy7mCcdBU",
      externalLink: "https://open.spotify.com/album/4SBy8zVCZXxPgVy7mCcdBU",
    },
  ],
  title: "Sign of the Times",
  createdAt: "2026-09-03T13:17:30.281Z",
  updatedAt: "2026-09-21T16:45:29.000Z",
} as const satisfies Release
