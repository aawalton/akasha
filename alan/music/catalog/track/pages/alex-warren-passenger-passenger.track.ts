import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const alexWarrenPassengerPassenger = {
  id: "01a0a59d-c973-7a65-8037-b354a3937ce9",
  type: "track",
  slug: "alex-warren-passenger-passenger",
  ownLength: 2.66285,
  ownProgress: 0,
  partOfCollections: ["release/alex-warren-passenger"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5Zv2Icw3vKuzQXZRhgmXkH",
      externalLink: "https://open.spotify.com/track/5Zv2Icw3vKuzQXZRhgmXkH",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "PASSENGER",
} as const satisfies Track
