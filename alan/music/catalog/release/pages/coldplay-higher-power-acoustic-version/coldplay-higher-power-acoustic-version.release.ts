import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const coldplayHigherPowerAcousticVersion = {
  id: "01a0676a-d720-703c-89fc-88fcd10d8224",
  type: "page-type/release",
  slug: "coldplay-higher-power-acoustic-version",
  ownLength: 7.018467,
  ownProgress: 7.09535,
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
} as const satisfies Release
