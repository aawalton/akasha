import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const kellyClarksonMyDecemberHole = {
  id: "01a0a5ae-c9a2-7c0a-a5d0-8fb3662754d5",
  type: "page-type/track",
  slug: "kelly-clarkson-my-december-hole",
  ownLength: 3.016,
  ownProgress: 0,
  partOfCollections: ["release/kelly-clarkson-my-december"],
  position: 3,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5GYuCJAQlaAUOc5SVHW1AC",
      externalLink: "https://open.spotify.com/track/5GYuCJAQlaAUOc5SVHW1AC",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Hole",
} as const satisfies Track
