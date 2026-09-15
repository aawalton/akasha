import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const siaBreatheMeBreatheMe = {
  id: "01a0a59c-40ca-7d4f-bc24-5c7393f5d2b4",
  type: "page-type/track",
  slug: "sia-breathe-me-breathe-me",
  ownLength: 4.61555,
  ownProgress: 0,
  partOfCollections: ["release/sia-breathe-me"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0uCdi39iBbemx1JmkaATNE",
      externalLink: "https://open.spotify.com/track/0uCdi39iBbemx1JmkaATNE",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Breathe Me",
} as const satisfies Track
