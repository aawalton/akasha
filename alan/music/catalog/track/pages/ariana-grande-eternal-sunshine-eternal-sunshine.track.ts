import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeEternalSunshineEternalSunshine = {
  id: "01a0a6c5-1b46-70ba-9d03-59e386ac854b",
  type: "page-type/track",
  slug: "ariana-grande-eternal-sunshine-eternal-sunshine",
  ownLength: 3.5033333333333334,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-eternal-sunshine"],
  position: 5,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3RwWW7KeVhHGayYJgUL5eZ",
      externalLink: "https://open.spotify.com/track/3RwWW7KeVhHGayYJgUL5eZ",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "eternal sunshine",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" }],
  trackKey: "eternalsunshine|66CXWjxzNUsdJxJ2JdwvnR|210200",
  song: "song/ariana-grande-eternal-sunshine",
} as const satisfies Track
