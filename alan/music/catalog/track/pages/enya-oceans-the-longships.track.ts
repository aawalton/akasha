import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const enyaOceansTheLongships = {
  id: "01a0a5b0-2d35-76d9-bb2a-5e273e66b9a7",
  type: "track",
  slug: "enya-oceans-the-longships",
  ownLength: 3.6473333333333335,
  ownProgress: 0,
  partOfCollections: ["release/enya-oceans"],
  position: 12,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3xbRV3WfuxxoSWRl27iQED",
      externalLink: "https://open.spotify.com/track/3xbRV3WfuxxoSWRl27iQED",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "The Longships",
} as const satisfies Track
