import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const enyaAndWinterCameStarsAndMidnightBlue = {
  id: "01a0a5b0-0f0e-7ef7-a398-2d4a97dee171",
  type: "track",
  slug: "enya-and-winter-came-stars-and-midnight-blue",
  ownLength: 3.14555,
  ownProgress: 0,
  partOfCollections: ["release/enya-and-winter-came"],
  position: 9,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "45rWIZ45DIW2vDz0DorQ0p",
      externalLink: "https://open.spotify.com/track/45rWIZ45DIW2vDz0DorQ0p",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Stars and Midnight Blue",
} as const satisfies Track
