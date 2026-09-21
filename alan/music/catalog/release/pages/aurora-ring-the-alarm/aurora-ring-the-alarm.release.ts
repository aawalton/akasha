import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const auroraRingTheAlarm = {
  id: "01a0676a-d728-700b-a3a2-58da70a3a62f",
  type: "page-type/release",
  slug: "aurora-ring-the-alarm",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/aurora"],
  position: 0,
  publishedAt: "2025-12-04",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "28NiaM4URrr1SBbJG0WcTV",
      externalLink: "https://open.spotify.com/album/28NiaM4URrr1SBbJG0WcTV",
      lastSyncedAt: "2025-12-31",
    },
  ],
  title: "RING THE ALARM",
} as const satisfies Release
