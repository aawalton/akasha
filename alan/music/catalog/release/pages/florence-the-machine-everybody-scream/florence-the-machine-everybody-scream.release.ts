import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const florenceTheMachineEverybodyScream = {
  id: "01a0676a-d71d-7035-b909-d2c0930d69b2",
  type: "release",
  slug: "florence-the-machine-everybody-scream",
  title: "Everybody Scream",
  partOfCollections: ["artist/florence-the-machine"],
  position: 0,
  ownLength: 49.65215,
  ownProgress: 49.65215,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2025-10-31",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0z7l9VEJyFMv8p8wffRDaF",
      externalLink: "https://open.spotify.com/album/0z7l9VEJyFMv8p8wffRDaF",
      lastSyncedAt: "2026-02-14",
    },
  ],
} as const satisfies Release
