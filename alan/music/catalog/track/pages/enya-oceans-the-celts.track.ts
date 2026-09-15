import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const enyaOceansTheCelts = {
  id: "01a0a5b0-2c51-7ebd-820d-9377ba65805b",
  type: "track",
  slug: "enya-oceans-the-celts",
  ownLength: 2.92555,
  ownProgress: 0,
  partOfCollections: ["release/enya-oceans"],
  position: 6,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3lHLU3KbrxjnPFQqOgXvUq",
      externalLink: "https://open.spotify.com/track/3lHLU3KbrxjnPFQqOgXvUq",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "The Celts",
} as const satisfies Track
