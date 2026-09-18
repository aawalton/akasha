import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const auroraRunawayOrchestralRunaway = {
  id: "01a0b637-ff1d-76af-8e4b-e7e077b4c2b4",
  type: "page-type/track",
  slug: "aurora-runaway-orchestral-runaway",
  ownLength: 4.1471,
  ownProgress: 0,
  partOfCollections: ["release/aurora-runaway-orchestral"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7q4GbvEAG61cG2tXP1vQYg",
      externalLink: "https://open.spotify.com/track/7q4GbvEAG61cG2tXP1vQYg",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Runaway",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "1WgXqy2Dd70QQOU7Ay074N", artistName: "AURORA" }],
  trackKey: "runaway|1WgXqy2Dd70QQOU7Ay074N|248826",
} as const satisfies Track
