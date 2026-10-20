import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const siaIMStillHere = {
  id: "01a0676a-d721-7035-b1c8-1b98a2447522",
  type: "page-type/release",
  slug: "sia-i-m-still-here",
  title: "I'm Still Here",
  partOfCollections: ["artist/sia"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2018-10-12",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "61rbnX1w8qupnV0CyNH1Or",
      externalLink: "https://open.spotify.com/album/61rbnX1w8qupnV0CyNH1Or",
      lastSyncedAt: "2025-11-27",
    },
  ],
  createdAt: "2026-09-03T13:17:30.273Z",
  updatedAt: "2026-10-20T14:01:30.339Z",
  progressedAt: "2026-10-20T14:01:30.339Z",
} as const satisfies Release
