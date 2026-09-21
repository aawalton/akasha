import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const arianaGrandeJustLookUpFromDonTLookUp = {
  id: "01a0676a-d722-7031-8189-93b6aadd2c1b",
  type: "page-type/release",
  slug: "ariana-grande-just-look-up-from-don-t-look-up",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/ariana-grande"],
  position: 0,
  publishedAt: "2021-12-03",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1geA7d12ed5LXsBns7ONB4",
      externalLink: "https://open.spotify.com/album/1geA7d12ed5LXsBns7ONB4",
      lastSyncedAt: "2025-10-02",
    },
  ],
  title: "Just Look Up (From Don’t Look Up)",
} as const satisfies Release
