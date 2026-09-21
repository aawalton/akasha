import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const greenDayBbcSessionsLive = {
  id: "01a0676a-d718-7018-a572-f8e3373d38cd",
  type: "page-type/release",
  slug: "green-day-bbc-sessions-live",
  title: "BBC Sessions (Live)",
  partOfCollections: ["artist/green-day"],
  position: 0,
  ownLength: 48.564067,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  grade: "C",
  publishedAt: "2021-12-10",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7igexfyHGnY4qMAyOzc4q8",
      externalLink: "https://open.spotify.com/album/7igexfyHGnY4qMAyOzc4q8",
      lastSyncedAt: "2025-10-04",
    },
  ],
} as const satisfies Release
