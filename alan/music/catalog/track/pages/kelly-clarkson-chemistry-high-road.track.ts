import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const kellyClarksonChemistryHighRoad = {
  id: "01a0a5ae-b8ae-729f-9ce3-0d1700d8612a",
  type: "track",
  slug: "kelly-clarkson-chemistry-high-road",
  ownLength: 3.3185333333333333,
  ownProgress: 0,
  partOfCollections: ["release/kelly-clarkson-chemistry"],
  position: 3,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "61JOxv4TJQ4NsGTdrbJugj",
      externalLink: "https://open.spotify.com/track/61JOxv4TJQ4NsGTdrbJugj",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "high road",
} as const satisfies Track
