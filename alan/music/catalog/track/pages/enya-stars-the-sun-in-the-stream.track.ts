import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const enyaStarsTheSunInTheStream = {
  id: "01a0a5b0-186d-75bf-87f4-5024098b1a8d",
  type: "page-type/track",
  slug: "enya-stars-the-sun-in-the-stream",
  ownLength: 2.923766666666667,
  ownProgress: 0,
  partOfCollections: ["release/enya-stars"],
  position: 14,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5s04yUHbjAlrNIISi2Afba",
      externalLink: "https://open.spotify.com/track/5s04yUHbjAlrNIISi2Afba",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "The Sun in the Stream",
} as const satisfies Track
