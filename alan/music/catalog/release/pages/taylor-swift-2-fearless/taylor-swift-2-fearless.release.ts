import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const taylorSwift2Fearless = {
  id: "01a0676a-d71d-706a-a752-105022e06278",
  type: "page-type/release",
  slug: "taylor-swift-2-fearless",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/taylor-swift"],
  position: 0,
  publishedAt: "2008-11-11",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2dqn5yOQWdyGwOpOIi9O4x",
      externalLink: "https://open.spotify.com/album/2dqn5yOQWdyGwOpOIi9O4x",
    },
  ],
  title: "Fearless",
  createdAt: "2026-09-03T13:17:30.269Z",
  updatedAt: "2026-09-23T14:01:20.000Z",
} as const satisfies Release
