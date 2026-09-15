import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const kellyClarksonPieceByPieceDeluxeVersionHeartbeatSong = {
  id: "01a0a5ae-be23-7dba-8a0f-0b3b7b5118a7",
  type: "track",
  slug: "kelly-clarkson-piece-by-piece-deluxe-version-heartbeat-song",
  ownLength: 3.31235,
  ownProgress: 0,
  partOfCollections: ["release/kelly-clarkson-piece-by-piece-deluxe-version"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4WGgAdWVeF0ExmWow9R9XY",
      externalLink: "https://open.spotify.com/track/4WGgAdWVeF0ExmWow9R9XY",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Heartbeat Song",
} as const satisfies Track
