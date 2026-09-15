import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const siaPerfectPerfectWithSia = {
  id: "01a0a59c-1c34-7291-a8db-f4b695fd9d85",
  type: "track",
  slug: "sia-perfect-perfect-with-sia",
  ownLength: 3.4814166666666666,
  ownProgress: 0,
  partOfCollections: ["release/sia-perfect"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7gh6635LXixA4Cw9baMWKp",
      externalLink: "https://open.spotify.com/track/7gh6635LXixA4Cw9baMWKp",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Perfect (with Sia)",
} as const satisfies Track
