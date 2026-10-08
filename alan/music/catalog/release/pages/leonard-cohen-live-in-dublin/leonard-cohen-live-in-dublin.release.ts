import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const leonardCohenLiveInDublin = {
  id: "01a0676a-d723-7050-8e60-69bf091a9c92",
  type: "page-type/release",
  slug: "leonard-cohen-live-in-dublin",
  title: "Live In Dublin",
  partOfCollections: ["artist/leonard-cohen"],
  position: 0,
  ownLength: 180.084033,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2014-11-28",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4CKs4nbhva7asiYqsZpMOi",
      externalLink: "https://open.spotify.com/album/4CKs4nbhva7asiYqsZpMOi",
      lastSyncedAt: "2025-10-10",
    },
  ],
  createdAt: "2026-09-03T13:17:30.275Z",
  updatedAt: "2026-09-15T16:37:27.000Z",
} as const satisfies Release
