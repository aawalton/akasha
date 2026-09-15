import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const florenceTheMachineEverybodyScreamOneOfTheGreats = {
  id: "01a0a5cd-48f9-7679-ab61-7efd099657d3",
  type: "track",
  slug: "florence-the-machine-everybody-scream-one-of-the-greats",
  ownLength: 6.534966666666667,
  ownProgress: 0,
  partOfCollections: ["release/florence-the-machine-everybody-scream"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3qrht50EwYuMgjPkM2A3aJ",
      externalLink: "https://open.spotify.com/track/3qrht50EwYuMgjPkM2A3aJ",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "One of the Greats",
} as const satisfies Track
