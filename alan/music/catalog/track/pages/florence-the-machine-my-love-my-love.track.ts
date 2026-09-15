import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const florenceTheMachineMyLoveMyLove = {
  id: "01a0a5cd-7b32-74ee-950a-5d56f0d29b89",
  type: "page-type/track",
  slug: "florence-the-machine-my-love-my-love",
  ownLength: 3.8568,
  ownProgress: 0,
  partOfCollections: ["release/florence-the-machine-my-love"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3leQLTAf9btWYR0bbIiHeZ",
      externalLink: "https://open.spotify.com/track/3leQLTAf9btWYR0bbIiHeZ",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "My Love",
} as const satisfies Track
