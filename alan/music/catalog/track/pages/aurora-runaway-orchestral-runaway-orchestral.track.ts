import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const auroraRunawayOrchestralRunawayOrchestral = {
  id: "01a0b637-fef6-7326-b67c-f4b4e4d9efd2",
  type: "page-type/track",
  slug: "aurora-runaway-orchestral-runaway-orchestral",
  ownLength: 4.135283333333334,
  ownProgress: 0,
  partOfCollections: ["release/aurora-runaway-orchestral"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "191312TzYS7Vvi0yxABhIh",
      externalLink: "https://open.spotify.com/track/191312TzYS7Vvi0yxABhIh",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Runaway - Orchestral",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "1WgXqy2Dd70QQOU7Ay074N", artistName: "AURORA" }],
  trackKey: "runawayorchestral|1WgXqy2Dd70QQOU7Ay074N|248117",
  song: "song/aurora-runaway-orchestral",
} as const satisfies Track
