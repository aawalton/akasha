import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const kellyClarksonWhenChemistryComesAroundMine = {
  id: "01a0a5ae-ce7d-7e6a-aa9f-5a047e4d92cc",
  type: "track",
  slug: "kelly-clarkson-when-chemistry-comes-around-mine",
  ownLength: 3.18345,
  ownProgress: 0,
  partOfCollections: ["release/kelly-clarkson-when-chemistry-comes-around"],
  position: 4,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "31bR8LtT0mdOh2GPdjeyhV",
      externalLink: "https://open.spotify.com/track/31bR8LtT0mdOh2GPdjeyhV",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "mine",
} as const satisfies Track
