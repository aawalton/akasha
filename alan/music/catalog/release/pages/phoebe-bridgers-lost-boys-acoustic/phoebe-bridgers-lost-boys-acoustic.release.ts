import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const phoebeBridgersLostBoysAcoustic = {
  id: "01a0a198-5efe-76f2-aafb-82c8bf0c8746",
  type: "page-type/release",
  slug: "phoebe-bridgers-lost-boys-acoustic",
  ownLength: 8.93285,
  ownProgress: 0,
  partOfCollections: ["artist/phoebe-bridgers"],
  position: 0,
  publishedAt: "2026-07-16",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4VWVyTfUqD1dMDw1KApbk4",
      externalLink: "https://open.spotify.com/album/4VWVyTfUqD1dMDw1KApbk4",
      lastSyncedAt: "2026-09-14",
    },
  ],
  title: "Lost Boys (Acoustic)",
} as const satisfies Release
