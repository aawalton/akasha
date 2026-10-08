import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const coldplayHigherPowerAcousticVersion = {
  id: "01a0676a-d720-703c-89fc-88fcd10d8224",
  type: "page-type/release",
  slug: "coldplay-higher-power-acoustic-version",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/coldplay"],
  position: 0,
  publishedAt: "2021-06-15",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4VsMbx69vl5FmhkosEa9By",
      externalLink: "https://open.spotify.com/album/4VsMbx69vl5FmhkosEa9By",
    },
  ],
  title: "Higher Power (Acoustic Version)",
  createdAt: "2026-09-03T13:17:30.272Z",
  updatedAt: "2026-09-21T16:45:29.000Z",
} as const satisfies Release
