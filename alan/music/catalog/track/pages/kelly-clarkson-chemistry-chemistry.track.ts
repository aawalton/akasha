import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const kellyClarksonChemistryChemistry = {
  id: "01a0a5ae-b918-7640-b0bc-732e7fd75122",
  type: "track",
  slug: "kelly-clarkson-chemistry-chemistry",
  ownLength: 2.5165,
  ownProgress: 0,
  partOfCollections: ["release/kelly-clarkson-chemistry"],
  position: 6,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2g81fW0TR4ZJMAi3tMhE1a",
      externalLink: "https://open.spotify.com/track/2g81fW0TR4ZJMAi3tMhE1a",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "chemistry",
} as const satisfies Track
