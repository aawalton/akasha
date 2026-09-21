import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const jisooMe = {
  id: "01a0676a-d724-703f-a8d0-76c47bdca58f",
  type: "page-type/release",
  slug: "jisoo-me",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/jisoo"],
  position: 0,
  publishedAt: "2023-03-31",
  rank: "B",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4QuczuzDZNzCDli5Gz6DQ0",
      externalLink: "https://open.spotify.com/album/4QuczuzDZNzCDli5Gz6DQ0",
      lastSyncedAt: "2025-11-24",
    },
  ],
  title: "ME",
} as const satisfies Release
