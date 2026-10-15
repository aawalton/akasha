import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const phoebeBridgersLostWeekend = {
  id: "01a0a198-5ee1-77c2-bad1-ce89e729db01",
  type: "page-type/release",
  slug: "phoebe-bridgers-lost-weekend",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/phoebe-bridgers"],
  position: 0,
  publishedAt: "2026-08-14",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2NSzwyYvQvdOQAoEjrlw9c",
      externalLink: "https://open.spotify.com/album/2NSzwyYvQvdOQAoEjrlw9c",
      lastSyncedAt: "2026-09-14",
    },
  ],
  title: "Lost Weekend",
  createdAt: "2026-09-14T20:25:12.673Z",
  updatedAt: "2026-10-15T14:00:33.419Z",
} as const satisfies Release
