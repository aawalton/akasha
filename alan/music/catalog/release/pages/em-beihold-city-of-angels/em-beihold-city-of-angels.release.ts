import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const emBeiholdCityOfAngels = {
  id: "01a0676a-d71a-7051-a24d-34cd25adc1d4",
  type: "page-type/release",
  slug: "em-beihold-city-of-angels",
  grade: "B",
  ownLength: 3.2384666666666666,
  ownProgress: 3.238467,
  partOfCollections: ["artist/em-beihold"],
  position: 0,
  publishedAt: "2020-08-14",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3ju0ulGqHuBVLfxJZ2nDcm",
      externalLink: "https://open.spotify.com/album/3ju0ulGqHuBVLfxJZ2nDcm",
      lastSyncedAt: "2026-09-24",
    },
  ],
  title: "City of Angels",
} as const satisfies Release
