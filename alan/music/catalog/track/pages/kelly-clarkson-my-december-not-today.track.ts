import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const kellyClarksonMyDecemberNotToday = {
  id: "01a0a5ae-cb31-78eb-b584-3e90b0932b04",
  type: "track",
  slug: "kelly-clarkson-my-december-not-today",
  ownLength: 3.490883333333333,
  ownProgress: 0,
  partOfCollections: ["release/kelly-clarkson-my-december"],
  position: 17,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5emntevTESKC3u0SSQvcO0",
      externalLink: "https://open.spotify.com/track/5emntevTESKC3u0SSQvcO0",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Not Today",
} as const satisfies Track
