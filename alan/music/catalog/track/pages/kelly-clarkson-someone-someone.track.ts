import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const kellyClarksonSomeoneSomeone = {
  id: "01a0a5ae-dc94-7119-b0a2-da6421fbaabe",
  type: "track",
  slug: "kelly-clarkson-someone-someone",
  ownLength: 3.6645333333333334,
  ownProgress: 0,
  partOfCollections: ["release/kelly-clarkson-someone"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2JGV7B1EMEVVrpZaz7tUDh",
      externalLink: "https://open.spotify.com/track/2JGV7B1EMEVVrpZaz7tUDh",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Someone",
} as const satisfies Track
