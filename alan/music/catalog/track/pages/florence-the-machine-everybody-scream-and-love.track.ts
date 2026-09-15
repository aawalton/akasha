import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const florenceTheMachineEverybodyScreamAndLove = {
  id: "01a0a5cd-4aae-7333-9fb3-b5c261b63fed",
  type: "page-type/track",
  slug: "florence-the-machine-everybody-scream-and-love",
  ownLength: 2.7484166666666665,
  ownProgress: 0,
  partOfCollections: ["release/florence-the-machine-everybody-scream"],
  position: 12,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7qqmsn4mjWvsXjBALuw8Jr",
      externalLink: "https://open.spotify.com/track/7qqmsn4mjWvsXjBALuw8Jr",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "And Love",
} as const satisfies Track
