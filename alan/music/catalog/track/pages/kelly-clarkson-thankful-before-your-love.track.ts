import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const kellyClarksonThankfulBeforeYourLove = {
  id: "01a0a5ae-cdc4-755f-b765-1d7214087640",
  type: "track",
  slug: "kelly-clarkson-thankful-before-your-love",
  ownLength: 3.9926666666666666,
  ownProgress: 0,
  partOfCollections: ["release/kelly-clarkson-thankful"],
  position: 12,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2S9GXXICP0ueChqt7ZmMZP",
      externalLink: "https://open.spotify.com/track/2S9GXXICP0ueChqt7ZmMZP",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Before Your Love",
} as const satisfies Track
