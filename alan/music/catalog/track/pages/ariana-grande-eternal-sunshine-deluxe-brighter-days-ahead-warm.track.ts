import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeEternalSunshineDeluxeBrighterDaysAheadWarm = {
  id: "01a0a6c5-10f0-708b-99b5-c4c1ba084c9c",
  type: "page-type/track",
  slug: "ariana-grande-eternal-sunshine-deluxe-brighter-days-ahead-warm",
  ownLength: 3.365083333333333,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-eternal-sunshine-deluxe-brighter-days-ahead"],
  position: 16,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0BeR2fJmYnKNn7IORw3GR9",
      externalLink: "https://open.spotify.com/track/0BeR2fJmYnKNn7IORw3GR9",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "warm",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" }],
  trackKey: "warm|66CXWjxzNUsdJxJ2JdwvnR|201905",
  song: "song/ariana-grande-warm",
} as const satisfies Track
