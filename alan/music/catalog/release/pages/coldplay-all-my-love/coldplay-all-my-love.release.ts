import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const coldplayAllMyLove = {
  id: "01a0676a-d716-7021-9292-003740e913a0",
  type: "page-type/release",
  slug: "coldplay-all-my-love",
  title: "ALL MY LOVE",
  partOfCollections: ["artist/coldplay"],
  position: 0,
  ownLength: 11.0588,
  ownProgress: 11.0588,
  unit: "unit/minutes",
  status: "completed",
  grade: "B",
  publishedAt: "2025-08-22",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5N2PVskrF5Sl7cLsIKMwfT",
      externalLink: "https://open.spotify.com/album/5N2PVskrF5Sl7cLsIKMwfT",
    },
  ],
  createdAt: "2026-09-03T13:17:30.262Z",
  updatedAt: "2026-09-21T19:44:25.000Z",
} as const satisfies Release
