import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeEternalSunshineIntroEndOfTheWorld = {
  id: "01a0a6c5-1aba-7168-bb07-27250ddc1e2b",
  type: "page-type/track",
  slug: "ariana-grande-eternal-sunshine-intro-end-of-the-world",
  ownLength: 1.54,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-eternal-sunshine"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2o1pb13quMReXZqE7jWsgq",
      externalLink: "https://open.spotify.com/track/2o1pb13quMReXZqE7jWsgq",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "intro (end of the world)",
  discNumber: 1,
  explicit: true,
  trackArtist: [{ externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" }],
  trackKey: "introendoftheworld|66CXWjxzNUsdJxJ2JdwvnR|92400",
} as const satisfies Track
