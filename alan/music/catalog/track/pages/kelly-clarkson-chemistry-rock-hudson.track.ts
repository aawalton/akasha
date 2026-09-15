import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const kellyClarksonChemistryRockHudson = {
  id: "01a0a5ae-b9a6-7374-8368-f68807523bc0",
  type: "page-type/track",
  slug: "kelly-clarkson-chemistry-rock-hudson",
  ownLength: 3.3692,
  ownProgress: 0,
  partOfCollections: ["release/kelly-clarkson-chemistry"],
  position: 10,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "45hEUx8ywENLrB13nEfntt",
      externalLink: "https://open.spotify.com/track/45hEUx8ywENLrB13nEfntt",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "rock hudson",
} as const satisfies Track
