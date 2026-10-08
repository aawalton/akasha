import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const leonardCohenLiveInLondon = {
  id: "01a0676a-d723-7051-9146-c9aa2d106a13",
  type: "page-type/release",
  slug: "leonard-cohen-live-in-london",
  title: "Live In London",
  partOfCollections: ["artist/leonard-cohen"],
  position: 0,
  ownLength: 155.76695,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2009-03-30",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4rgYbbaJOr9fv0MdEcIkIY",
      externalLink: "https://open.spotify.com/album/4rgYbbaJOr9fv0MdEcIkIY",
      lastSyncedAt: "2025-10-10",
    },
  ],
  createdAt: "2026-09-03T13:17:30.275Z",
  updatedAt: "2026-09-15T16:37:27.000Z",
} as const satisfies Release
