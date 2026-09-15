import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const kellyClarksonChemistryMyMistake = {
  id: "01a0a5ae-b9cf-7a1c-b38b-1d453049cc7a",
  type: "track",
  slug: "kelly-clarkson-chemistry-my-mistake",
  ownLength: 3.27705,
  ownProgress: 0,
  partOfCollections: ["release/kelly-clarkson-chemistry"],
  position: 11,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6j7QoUcmUwe1FFEoTiwjjd",
      externalLink: "https://open.spotify.com/track/6j7QoUcmUwe1FFEoTiwjjd",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "my mistake",
} as const satisfies Track
