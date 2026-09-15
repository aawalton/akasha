import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const enyaCloudsMorningGlory = {
  id: "01a0a5b0-2b4a-7c7a-aa43-63e28d23b51f",
  type: "track",
  slug: "enya-clouds-morning-glory",
  ownLength: 2.4717666666666664,
  ownProgress: 0,
  partOfCollections: ["release/enya-clouds"],
  position: 13,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3iSZhap4y8ciNTeiyw3AAw",
      externalLink: "https://open.spotify.com/track/3iSZhap4y8ciNTeiyw3AAw",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Morning Glory",
} as const satisfies Track
