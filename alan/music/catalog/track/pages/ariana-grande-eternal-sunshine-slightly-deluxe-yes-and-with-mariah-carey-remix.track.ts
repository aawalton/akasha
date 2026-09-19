import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeEternalSunshineSlightlyDeluxeYesAndWithMariahCareyRemix = {
  id: "01a0a6c5-1a97-7247-8a9d-29bfafce5bd7",
  type: "page-type/track",
  slug: "ariana-grande-eternal-sunshine-slightly-deluxe-yes-and-with-mariah-carey-remix",
  ownLength: 3.5832333333333333,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-eternal-sunshine-slightly-deluxe"],
  position: 17,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1UjPANunXLp0G9hbQNyPh9",
      externalLink: "https://open.spotify.com/track/1UjPANunXLp0G9hbQNyPh9",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "yes, and? (with Mariah Carey) - Remix",
  discNumber: 1,
  explicit: true,
  trackArtist: [
    { externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" },
    { externalId: "4iHNK0tOyZPYnBU7nGAgpQ", artistName: "Mariah Carey" },
  ],
  trackKey: "yesandwithmariahcareyremix|4iHNK0tOyZPYnBU7nGAgpQ,66CXWjxzNUsdJxJ2JdwvnR|214994",
  song: "song/ariana-grande-yes-and-2",
} as const satisfies Track
