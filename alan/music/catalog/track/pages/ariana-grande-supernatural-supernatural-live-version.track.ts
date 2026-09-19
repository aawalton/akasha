import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeSupernaturalSupernaturalLiveVersion = {
  id: "01a0a6c5-3159-719a-bf0c-dbe0530f4923",
  type: "page-type/track",
  slug: "ariana-grande-supernatural-supernatural-live-version",
  ownLength: 2.7262333333333335,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-supernatural"],
  position: 3,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7LJAKnc0kpHkU0smvsEe6c",
      externalLink: "https://open.spotify.com/track/7LJAKnc0kpHkU0smvsEe6c",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "supernatural - live version",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" }],
  trackKey: "supernaturalliveversion|66CXWjxzNUsdJxJ2JdwvnR|163574",
  song: "song/ariana-grande-supernatural",
} as const satisfies Track
