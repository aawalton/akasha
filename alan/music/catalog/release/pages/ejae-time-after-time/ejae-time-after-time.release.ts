import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const ejaeTimeAfterTime = {
  id: "01a0676a-d72e-7043-95ef-062096156c2e",
  type: "page-type/release",
  slug: "ejae-time-after-time",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/ejae"],
  position: 0,
  publishedAt: "2026-02-06",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "24KhrK7jpSwwNDWvKr04NO",
      externalLink: "https://open.spotify.com/album/24KhrK7jpSwwNDWvKr04NO",
      lastSyncedAt: "2026-03-09",
    },
  ],
  title: "Time After Time",
} as const satisfies Release
