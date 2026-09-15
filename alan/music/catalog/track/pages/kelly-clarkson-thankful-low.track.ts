import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const kellyClarksonThankfulLow = {
  id: "01a0a5ae-ccc8-7187-8417-b0c8fa0e7d3e",
  type: "page-type/track",
  slug: "kelly-clarkson-thankful-low",
  ownLength: 3.477333333333333,
  ownProgress: 0,
  partOfCollections: ["release/kelly-clarkson-thankful"],
  position: 3,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7HtE5z6XsuogcQJmnTNAIH",
      externalLink: "https://open.spotify.com/track/7HtE5z6XsuogcQJmnTNAIH",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Low",
} as const satisfies Track
