import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const zaraLarssonEurosummerGirlsTrip = {
  id: "01a0aa7c-238e-777e-b1e3-8aa4e908d468",
  type: "page-type/release",
  slug: "zara-larsson-eurosummer-girls-trip",
  ownLength: 2.8391,
  ownProgress: 0,
  partOfCollections: ["artist/zara-larsson"],
  position: 0,
  publishedAt: "2026-04-30",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0wU3ZMCw764smvcRskFJnY",
      externalLink: "https://open.spotify.com/album/0wU3ZMCw764smvcRskFJnY",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Eurosummer (Girls Trip)",
} as const satisfies Release
