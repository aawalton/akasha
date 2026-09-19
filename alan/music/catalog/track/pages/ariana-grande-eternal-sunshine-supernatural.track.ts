import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeEternalSunshineSupernatural = {
  id: "01a0a6c5-1b69-787b-8c11-54c03d4a9a56",
  type: "page-type/track",
  slug: "ariana-grande-eternal-sunshine-supernatural",
  ownLength: 2.7230166666666666,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-eternal-sunshine"],
  position: 6,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "142PiXzA84lmEw2RstFHFa",
      externalLink: "https://open.spotify.com/track/142PiXzA84lmEw2RstFHFa",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "supernatural",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" }],
  trackKey: "supernatural|66CXWjxzNUsdJxJ2JdwvnR|163381",
  song: "song/ariana-grande-supernatural-2",
} as const satisfies Track
