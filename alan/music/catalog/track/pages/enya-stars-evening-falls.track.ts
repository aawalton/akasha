import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const enyaStarsEveningFalls = {
  id: "01a0a5b0-16bb-7591-b79a-888cd06a7032",
  type: "page-type/track",
  slug: "enya-stars-evening-falls",
  ownLength: 3.8099833333333333,
  ownProgress: 0,
  partOfCollections: ["release/enya-stars"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2E88xJU4Cp0eifBVXusDRc",
      externalLink: "https://open.spotify.com/track/2E88xJU4Cp0eifBVXusDRc",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Evening Falls...",
} as const satisfies Track
