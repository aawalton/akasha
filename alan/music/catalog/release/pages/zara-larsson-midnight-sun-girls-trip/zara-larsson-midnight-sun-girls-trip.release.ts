import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const zaraLarssonMidnightSunGirlsTrip = {
  id: "01a0aa7c-2008-7037-beb1-42f6917b36e5",
  type: "page-type/release",
  slug: "zara-larsson-midnight-sun-girls-trip",
  ownLength: 66.06976666666667,
  ownProgress: 0,
  partOfCollections: ["artist/zara-larsson"],
  position: 0,
  publishedAt: "2026-05-01",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4WMcRlbt7NvpKrrqO8ykQf",
      externalLink: "https://open.spotify.com/album/4WMcRlbt7NvpKrrqO8ykQf",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Midnight Sun: Girls Trip",
} as const satisfies Release
