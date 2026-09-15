import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const enyaStarsExile = {
  id: "01a0a5b0-17c9-7cdf-abfe-bbca405617cf",
  type: "track",
  slug: "enya-stars-exile",
  ownLength: 4.368883333333334,
  ownProgress: 0,
  partOfCollections: ["release/enya-stars"],
  position: 9,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7DHYLGnhdmeladlQ0LM0Nf",
      externalLink: "https://open.spotify.com/track/7DHYLGnhdmeladlQ0LM0Nf",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Exile",
} as const satisfies Track
