import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const siaTogether = {
  id: "01a0676a-d72f-700c-aa4e-5312a86b877b",
  type: "page-type/release",
  slug: "sia-together",
  title: "Together",
  partOfCollections: ["artist/sia"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2020-05-20",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4TM7wmWEakp4xk1ZffVkL8",
      externalLink: "https://open.spotify.com/album/4TM7wmWEakp4xk1ZffVkL8",
      lastSyncedAt: "2025-11-27",
    },
  ],
  createdAt: "2026-09-03T13:17:30.287Z",
  updatedAt: "2026-10-20T14:01:30.339Z",
  progressedAt: "2026-10-20T14:01:30.339Z",
} as const satisfies Release
