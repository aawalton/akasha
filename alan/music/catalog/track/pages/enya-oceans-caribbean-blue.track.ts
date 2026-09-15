import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const enyaOceansCaribbeanBlue = {
  id: "01a0a5b0-2bc7-790f-92de-21c217ecb4de",
  type: "page-type/track",
  slug: "enya-oceans-caribbean-blue",
  ownLength: 3.97665,
  ownProgress: 0,
  partOfCollections: ["release/enya-oceans"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7cBGKsYmMVHb9g8xreIFwh",
      externalLink: "https://open.spotify.com/track/7cBGKsYmMVHb9g8xreIFwh",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Caribbean Blue",
} as const satisfies Track
