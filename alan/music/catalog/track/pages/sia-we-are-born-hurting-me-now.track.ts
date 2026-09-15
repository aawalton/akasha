import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const siaWeAreBornHurtingMeNow = {
  id: "01a0a59c-0aa1-7986-8545-aa4e452cd7a7",
  type: "page-type/track",
  slug: "sia-we-are-born-hurting-me-now",
  ownLength: 3.4417666666666666,
  ownProgress: 0,
  partOfCollections: ["release/sia-we-are-born"],
  position: 7,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5oWvzE24QFWnN65r0sA5eW",
      externalLink: "https://open.spotify.com/track/5oWvzE24QFWnN65r0sA5eW",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Hurting Me Now",
} as const satisfies Track
