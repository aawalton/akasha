import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const siaGimmeChristmas = {
  id: "01a0676a-d71e-705c-911a-541f12546e94",
  type: "page-type/release",
  slug: "sia-gimme-christmas",
  title: "Gimme Christmas",
  partOfCollections: ["artist/sia"],
  position: 0,
  ownLength: 18.955083333333334,
  ownProgress: 18.955083,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2023-11-01",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7ohxk0aNpEgt1t2cMRkxcX",
      externalLink: "https://open.spotify.com/album/7ohxk0aNpEgt1t2cMRkxcX",
      lastSyncedAt: "2025-11-27",
    },
  ],
  createdAt: "2026-09-03T13:17:30.270Z",
  updatedAt: "2026-10-20T13:51:09.878Z",
} as const satisfies Release
