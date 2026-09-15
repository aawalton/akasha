import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const enyaStarsOnYourShore = {
  id: "01a0a5b0-17e6-7a0e-90c7-b0770991cd50",
  type: "page-type/track",
  slug: "enya-stars-on-your-shore",
  ownLength: 3.9966666666666666,
  ownProgress: 0,
  partOfCollections: ["release/enya-stars"],
  position: 10,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "28khKDAOuQvtkuN3tt6E5R",
      externalLink: "https://open.spotify.com/track/28khKDAOuQvtkuN3tt6E5R",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "On Your Shore",
} as const satisfies Track
