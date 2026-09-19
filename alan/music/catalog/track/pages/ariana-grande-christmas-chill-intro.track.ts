import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeChristmasChillIntro = {
  id: "01a0a6c5-39e5-7ffa-a2b6-c50adfbb2317",
  type: "page-type/track",
  slug: "ariana-grande-christmas-chill-intro",
  ownLength: 1.09475,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-christmas-chill"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2RD9V9Yzn6CF1HizEqAXlR",
      externalLink: "https://open.spotify.com/track/2RD9V9Yzn6CF1HizEqAXlR",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Intro",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" }],
  trackKey: "intro|66CXWjxzNUsdJxJ2JdwvnR|65685",
  song: "song/ariana-grande-intro",
} as const satisfies Track
