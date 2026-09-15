import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const florenceTheMachineFreeFree = {
  id: "01a0a5cd-7a80-7567-b3fc-9c61c1f6897b",
  type: "page-type/track",
  slug: "florence-the-machine-free-free",
  ownLength: 3.914283333333333,
  ownProgress: 0,
  partOfCollections: ["release/florence-the-machine-free"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6k7vblX4M4TgEjPt6jLoHZ",
      externalLink: "https://open.spotify.com/track/6k7vblX4M4TgEjPt6jLoHZ",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Free",
} as const satisfies Track
