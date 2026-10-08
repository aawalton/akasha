import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const girlInRedBadIdea = {
  id: "01a0676a-d718-700a-9d51-34101559a21c",
  type: "page-type/release",
  slug: "girl-in-red-bad-idea",
  title: "bad idea!",
  partOfCollections: ["artist/girl-in-red"],
  position: 0,
  ownLength: 3.660633,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2019-09-03",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4AEKKY9Sny3Uj6U3ELK4Sl",
      externalLink: "https://open.spotify.com/album/4AEKKY9Sny3Uj6U3ELK4Sl",
    },
  ],
  createdAt: "2026-09-03T13:17:30.264Z",
  updatedAt: "2026-09-15T16:35:36.000Z",
} as const satisfies Release
