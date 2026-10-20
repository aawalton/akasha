import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const siaEyeOfTheNeedle = {
  id: "01a0676a-d71d-7051-acf1-13741c4bed09",
  type: "page-type/release",
  slug: "sia-eye-of-the-needle",
  title: "Eye of the Needle",
  partOfCollections: ["artist/sia"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2014-06-03",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "70lLHdM8BVCqhGJ9W6FVSu",
      externalLink: "https://open.spotify.com/album/70lLHdM8BVCqhGJ9W6FVSu",
      lastSyncedAt: "2025-11-27",
    },
  ],
  createdAt: "2026-09-03T13:17:30.269Z",
  updatedAt: "2026-10-20T14:01:30.339Z",
  progressedAt: "2026-10-20T14:01:30.339Z",
} as const satisfies Release
