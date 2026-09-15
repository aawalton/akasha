import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const kellyClarksonChemistryMine = {
  id: "01a0a5ae-b88c-744d-9637-d121717d7f9d",
  type: "track",
  slug: "kelly-clarkson-chemistry-mine",
  ownLength: 3.18345,
  ownProgress: 0,
  partOfCollections: ["release/kelly-clarkson-chemistry"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "20XB21FHWhdyWTs5z7p9Vl",
      externalLink: "https://open.spotify.com/track/20XB21FHWhdyWTs5z7p9Vl",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "mine",
} as const satisfies Track
