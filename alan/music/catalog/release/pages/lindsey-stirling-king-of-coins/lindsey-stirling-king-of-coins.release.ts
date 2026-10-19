import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const lindseyStirlingKingOfCoins = {
  id: "01a0a587-c222-7138-b621-4445e8ca3d65",
  type: "page-type/release",
  slug: "lindsey-stirling-king-of-coins",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/lindsey-stirling"],
  position: 0,
  publishedAt: "2026-08-28",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6wue5FJ9GGjrbgYmNwkgGA",
      externalLink: "https://open.spotify.com/album/6wue5FJ9GGjrbgYmNwkgGA",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "King of Coins",
  createdAt: "2026-09-15T14:45:32.834Z",
  updatedAt: "2026-10-19T14:01:29.522Z",
} as const satisfies Release
