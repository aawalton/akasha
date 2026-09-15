import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const kellyClarksonTieItUpTieItUp = {
  id: "01a0a5ae-deec-7887-8b5b-e3b405d2d4bc",
  type: "track",
  slug: "kelly-clarkson-tie-it-up-tie-it-up",
  ownLength: 2.7984333333333336,
  ownProgress: 0,
  partOfCollections: ["release/kelly-clarkson-tie-it-up"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6Cra4GLG5fE5M3aiVQ3SVk",
      externalLink: "https://open.spotify.com/track/6Cra4GLG5fE5M3aiVQ3SVk",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Tie It Up",
} as const satisfies Track
