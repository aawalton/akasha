import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const siaPerfectPerfect = {
  id: "01a0a59c-1c74-7fe4-a264-60caef63b7f3",
  type: "track",
  slug: "sia-perfect-perfect",
  ownLength: 3.45675,
  ownProgress: 0,
  partOfCollections: ["release/sia-perfect"],
  position: 3,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1HxewH6lfEMDgxRvOn9sFD",
      externalLink: "https://open.spotify.com/track/1HxewH6lfEMDgxRvOn9sFD",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Perfect",
} as const satisfies Track
