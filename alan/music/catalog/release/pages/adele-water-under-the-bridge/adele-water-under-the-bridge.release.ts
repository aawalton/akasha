import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const adeleWaterUnderTheBridge = {
  id: "01a0676a-d730-701c-a461-f280fb4f2dc2",
  type: "page-type/release",
  slug: "adele-water-under-the-bridge",
  title: "Water Under the Bridge",
  partOfCollections: ["artist/adele"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2016-11-04",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4wrmR6foH3E5mv5pKtfi49",
      externalLink: "https://open.spotify.com/album/4wrmR6foH3E5mv5pKtfi49",
      lastSyncedAt: "2026-02-09",
    },
  ],
  createdAt: "2026-09-03T13:17:30.288Z",
  updatedAt: "2026-09-24T21:00:29.000Z",
} as const satisfies Release
