import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const sabrinaCarpenterAlien = {
  id: "01a0676a-d716-7011-8b11-ab7fd0001d8c",
  type: "page-type/release",
  slug: "sabrina-carpenter-alien",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/sabrina-carpenter"],
  position: 0,
  publishedAt: "2018-03-16",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3LXVxMUrioKZcoheV2zT3u",
      externalLink: "https://open.spotify.com/album/3LXVxMUrioKZcoheV2zT3u",
      lastSyncedAt: "2025-12-24",
    },
  ],
  title: "Alien",
  createdAt: "2026-09-03T13:17:30.262Z",
  updatedAt: "2026-09-21T16:45:29.000Z",
} as const satisfies Release
