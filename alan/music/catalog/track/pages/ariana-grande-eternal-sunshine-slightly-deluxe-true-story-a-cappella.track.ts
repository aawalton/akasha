import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeEternalSunshineSlightlyDeluxeTrueStoryACappella = {
  id: "01a0a6c5-1a74-7f03-aed4-4af65ac9cad1",
  type: "page-type/track",
  slug: "ariana-grande-eternal-sunshine-slightly-deluxe-true-story-a-cappella",
  ownLength: 2.70145,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-eternal-sunshine-slightly-deluxe"],
  position: 16,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4RSoXPyBHKolShYA6FhvfP",
      externalLink: "https://open.spotify.com/track/4RSoXPyBHKolShYA6FhvfP",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "true story - a cappella",
  trackType: "a-cappella",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" }],
  trackKey: "truestoryacappella|66CXWjxzNUsdJxJ2JdwvnR|162087",
  song: "song/ariana-grande-true-story",
} as const satisfies Track
