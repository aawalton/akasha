import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const arianaGrandePositionsDeluxe = {
  id: "01a0676a-d727-700c-b606-a36f111a33f6",
  type: "page-type/release",
  slug: "ariana-grande-positions-deluxe",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/ariana-grande"],
  position: 0,
  publishedAt: "2021-02-19",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "74vajFwEwXJ61OW1DKSPEa",
      externalLink: "https://open.spotify.com/album/74vajFwEwXJ61OW1DKSPEa",
      lastSyncedAt: "2025-10-02",
    },
  ],
  title: "Positions (Deluxe)",
} as const satisfies Release
