import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const kellyClarksonKellyokeBlueBayou = {
  id: "01a0a5ae-d149-7c16-814e-8c650c55192c",
  type: "page-type/track",
  slug: "kelly-clarkson-kellyoke-blue-bayou",
  ownLength: 3.86675,
  ownProgress: 0,
  partOfCollections: ["release/kelly-clarkson-kellyoke"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3w67gvawlNpzU1YiP355OM",
      externalLink: "https://open.spotify.com/track/3w67gvawlNpzU1YiP355OM",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Blue Bayou",
} as const satisfies Track
