import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const siaLiveFromSydney = {
  id: "01a0676a-d723-704d-836b-86b1ccdc56da",
  type: "page-type/release",
  slug: "sia-live-from-sydney",
  title: "Live from Sydney",
  partOfCollections: ["artist/sia"],
  position: 0,
  ownLength: 29.907083333333333,
  ownProgress: 29.907083,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2009-01-01",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "623a0m3oqPh5SzrTOPxudd",
      externalLink: "https://open.spotify.com/album/623a0m3oqPh5SzrTOPxudd",
      lastSyncedAt: "2025-11-27",
    },
  ],
  createdAt: "2026-09-03T13:17:30.275Z",
  updatedAt: "2026-10-20T13:51:09.878Z",
} as const satisfies Release
