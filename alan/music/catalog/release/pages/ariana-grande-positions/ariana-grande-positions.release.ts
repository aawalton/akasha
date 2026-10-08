import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const arianaGrandePositions = {
  id: "01a0676a-d727-700b-9f0c-cd5c1965a045",
  type: "page-type/release",
  slug: "ariana-grande-positions",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/ariana-grande"],
  position: 0,
  publishedAt: "2020-10-30",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3euz4vS7ezKGnNSwgyvKcd",
      externalLink: "https://open.spotify.com/album/3euz4vS7ezKGnNSwgyvKcd",
      lastSyncedAt: "2025-10-02",
    },
  ],
  title: "Positions",
  createdAt: "2026-09-03T13:17:30.279Z",
  updatedAt: "2026-09-21T16:45:29.000Z",
} as const satisfies Release
