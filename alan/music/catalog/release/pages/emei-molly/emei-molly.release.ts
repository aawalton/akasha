import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const emeiMolly = {
  id: "01a17878-1d57-784a-99f1-f64c070feb61",
  type: "page-type/release",
  slug: "emei-molly",
  ownLength: 3.2,
  ownProgress: 0,
  partOfCollections: ["artist/emei"],
  position: 0,
  publishedAt: "2026-10-02",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7szwDKPkHb7sJejPieuRD0",
      externalLink: "https://open.spotify.com/album/7szwDKPkHb7sJejPieuRD0",
      lastSyncedAt: "2026-10-26",
    },
  ],
  title: "Molly",
  createdAt: "2026-10-26T13:48:20.183Z",
  updatedAt: "2026-10-26T13:48:20.183Z",
} as const satisfies Release
