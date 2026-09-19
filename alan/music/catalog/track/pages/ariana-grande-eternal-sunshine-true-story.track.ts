import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeEternalSunshineTrueStory = {
  id: "01a0a6c5-1b8c-7a64-98a0-6f84e5d82dc9",
  type: "page-type/track",
  slug: "ariana-grande-eternal-sunshine-true-story",
  ownLength: 2.7213,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-eternal-sunshine"],
  position: 7,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "14kyXBpg91RVq8bNRDS1q2",
      externalLink: "https://open.spotify.com/track/14kyXBpg91RVq8bNRDS1q2",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "true story",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" }],
  trackKey: "truestory|66CXWjxzNUsdJxJ2JdwvnR|163278",
  song: "song/ariana-grande-true-story",
} as const satisfies Track
