import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const emBeiholdCityOfAngelsNeanderthalRemix = {
  id: "01a0676a-d71a-7053-a4b2-2a84f28ebf0b",
  type: "page-type/release",
  slug: "em-beihold-city-of-angels-neanderthal-remix",
  grade: "B",
  ownLength: 3.5,
  ownProgress: 3.5,
  partOfCollections: ["artist/em-beihold"],
  position: 0,
  publishedAt: "2020-09-25",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2sYK12JKV0MvhN8oM5ybc8",
      externalLink: "https://open.spotify.com/album/2sYK12JKV0MvhN8oM5ybc8",
      lastSyncedAt: "2026-09-24",
    },
  ],
  title: "City of Angels (Neanderthal Remix)",
} as const satisfies Release
