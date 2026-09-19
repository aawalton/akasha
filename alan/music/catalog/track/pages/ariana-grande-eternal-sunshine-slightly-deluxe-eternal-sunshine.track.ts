import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeEternalSunshineSlightlyDeluxeEternalSunshine = {
  id: "01a0a6c5-1903-735f-a4c5-2cc9dea67a38",
  type: "page-type/track",
  slug: "ariana-grande-eternal-sunshine-slightly-deluxe-eternal-sunshine",
  ownLength: 3.5033333333333334,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-eternal-sunshine-slightly-deluxe"],
  position: 5,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4llxVu7gt1uG1zN8EcWwi3",
      externalLink: "https://open.spotify.com/track/4llxVu7gt1uG1zN8EcWwi3",
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
