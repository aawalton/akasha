import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const siaWeAreBornNeverGonnaLeaveMe = {
  id: "01a0a59c-0ac0-7c61-a111-e01831cb57b6",
  type: "track",
  slug: "sia-we-are-born-never-gonna-leave-me",
  ownLength: 3.5606666666666666,
  ownProgress: 0,
  partOfCollections: ["release/sia-we-are-born"],
  position: 8,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6n11eN29spLUGutXsVpqIS",
      externalLink: "https://open.spotify.com/track/6n11eN29spLUGutXsVpqIS",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Never Gonna Leave Me",
} as const satisfies Track
