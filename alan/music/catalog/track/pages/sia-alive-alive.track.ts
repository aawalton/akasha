import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const siaAliveAlive = {
  id: "01a0a59c-3964-717f-99e0-5131507f37e6",
  type: "track",
  slug: "sia-alive-alive",
  ownLength: 4.398216666666666,
  ownProgress: 0,
  partOfCollections: ["release/sia-alive"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "05cXQMJcrM9msUYu11mOrs",
      externalLink: "https://open.spotify.com/track/05cXQMJcrM9msUYu11mOrs",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Alive",
} as const satisfies Track
