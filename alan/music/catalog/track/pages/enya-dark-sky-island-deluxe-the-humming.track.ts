import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const enyaDarkSkyIslandDeluxeTheHumming = {
  id: "01a0a5b0-0c74-7625-b523-919b3d5d6487",
  type: "track",
  slug: "enya-dark-sky-island-deluxe-the-humming",
  ownLength: 3.752,
  ownProgress: 0,
  partOfCollections: ["release/enya-dark-sky-island-deluxe"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7HrioB2CowXRcHIERwNCZ7",
      externalLink: "https://open.spotify.com/track/7HrioB2CowXRcHIERwNCZ7",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "The Humming",
} as const satisfies Track
