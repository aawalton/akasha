import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const arianaGrandePetal = {
  id: "01a0a6c5-03b4-7df3-b78a-0570d406fde1",
  type: "page-type/release",
  slug: "ariana-grande-petal",
  ownLength: 36.22258333333333,
  ownProgress: 0,
  partOfCollections: ["artist/ariana-grande"],
  position: 0,
  publishedAt: "2026-07-31",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2k4FmEtXR0WiDW0Ac2QArT",
      externalLink: "https://open.spotify.com/album/2k4FmEtXR0WiDW0Ac2QArT",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "petal",
} as const satisfies Release
