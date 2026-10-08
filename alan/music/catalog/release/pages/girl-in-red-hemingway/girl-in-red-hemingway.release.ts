import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const girlInRedHemingway = {
  id: "01a0676a-d720-702e-9df4-72c99a745ef5",
  type: "page-type/release",
  slug: "girl-in-red-hemingway",
  title: "Hemingway",
  partOfCollections: ["artist/girl-in-red"],
  position: 0,
  ownLength: 3.278283,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2025-05-30",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3JKMx86ymxWRpnBhmbBAus",
      externalLink: "https://open.spotify.com/album/3JKMx86ymxWRpnBhmbBAus",
    },
  ],
  createdAt: "2026-09-03T13:17:30.272Z",
  updatedAt: "2026-09-15T16:35:36.000Z",
} as const satisfies Release
