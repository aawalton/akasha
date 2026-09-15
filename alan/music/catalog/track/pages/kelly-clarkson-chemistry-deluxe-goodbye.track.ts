import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const kellyClarksonChemistryDeluxeGoodbye = {
  id: "01a0a5ae-b7c2-7d8b-8d67-d520dbd2bfd4",
  type: "page-type/track",
  slug: "kelly-clarkson-chemistry-deluxe-goodbye",
  ownLength: 3.2832,
  ownProgress: 0,
  partOfCollections: ["release/kelly-clarkson-chemistry-deluxe"],
  position: 18,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4doWwLlmUEinCUlJHSWQhh",
      externalLink: "https://open.spotify.com/track/4doWwLlmUEinCUlJHSWQhh",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "goodbye",
} as const satisfies Track
