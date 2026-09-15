import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const kellyClarksonMyDecemberMaybe = {
  id: "01a0a5ae-ca44-71ba-adda-e57ecb94e67e",
  type: "page-type/track",
  slug: "kelly-clarkson-my-december-maybe",
  ownLength: 4.375333333333334,
  ownProgress: 0,
  partOfCollections: ["release/kelly-clarkson-my-december"],
  position: 9,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0VH8cpnwWzUVclNrZv8V6f",
      externalLink: "https://open.spotify.com/track/0VH8cpnwWzUVclNrZv8V6f",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Maybe",
} as const satisfies Track
