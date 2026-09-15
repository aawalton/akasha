import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const enyaOceansPaxDeorum = {
  id: "01a0a5b0-2d12-7692-b13d-5eb7dac1124b",
  type: "track",
  slug: "enya-oceans-pax-deorum",
  ownLength: 4.906,
  ownProgress: 0,
  partOfCollections: ["release/enya-oceans"],
  position: 11,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "28bS8ThAb5hFu60E7ItKXr",
      externalLink: "https://open.spotify.com/track/28bS8ThAb5hFu60E7ItKXr",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Pax Deorum",
} as const satisfies Track
