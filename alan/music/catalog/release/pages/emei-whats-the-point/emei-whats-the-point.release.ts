import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const emeiWhatsThePoint = {
  id: "01a0c43e-714f-70d1-8c35-ad6a2bffb43e",
  type: "page-type/release",
  slug: "emei-whats-the-point",
  ownLength: 5.809033333333334,
  ownProgress: 0,
  partOfCollections: ["artist/emei"],
  position: 0,
  publishedAt: "2026-05-08",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0QFm3m1Wa8IMkUe1s8YLeS",
      externalLink: "https://open.spotify.com/album/0QFm3m1Wa8IMkUe1s8YLeS",
      lastSyncedAt: "2026-09-21",
    },
  ],
  title: "What's the Point!",
} as const satisfies Release
