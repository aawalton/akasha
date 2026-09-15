import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const enyaCloudsShepherdMoons = {
  id: "01a0a5b0-2a30-72cf-a996-e5ff0982bcde",
  type: "track",
  slug: "enya-clouds-shepherd-moons",
  ownLength: 3.67,
  ownProgress: 0,
  partOfCollections: ["release/enya-clouds"],
  position: 4,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "32mmqk3OtwCOzHKAlWA5p2",
      externalLink: "https://open.spotify.com/track/32mmqk3OtwCOzHKAlWA5p2",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Shepherd Moons",
} as const satisfies Track
