import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const kellyClarksonChemistryMe = {
  id: "01a0a5ae-b8d3-7835-9317-2685d9f3cb3e",
  type: "track",
  slug: "kelly-clarkson-chemistry-me",
  ownLength: 3.579083333333333,
  ownProgress: 0,
  partOfCollections: ["release/kelly-clarkson-chemistry"],
  position: 4,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2MoSO8vwJ8tJssBjjVKa3u",
      externalLink: "https://open.spotify.com/track/2MoSO8vwJ8tJssBjjVKa3u",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "me",
} as const satisfies Track
