import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const siaReaperReaper = {
  id: "01a0a59c-383c-79c9-a928-92bf0e425669",
  type: "page-type/track",
  slug: "sia-reaper-reaper",
  ownLength: 3.64155,
  ownProgress: 0,
  partOfCollections: ["release/sia-reaper"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0MxvLntGSIgq2WA2aFPix8",
      externalLink: "https://open.spotify.com/track/0MxvLntGSIgq2WA2aFPix8",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Reaper",
} as const satisfies Track
