import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeChristmasChillTrueLove = {
  id: "01a0a6c5-3a69-7b74-8554-fb7c9c594af7",
  type: "page-type/track",
  slug: "ariana-grande-christmas-chill-true-love",
  ownLength: 2.7706166666666667,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-christmas-chill"],
  position: 5,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "02E2iNkWn6VTWWfbwrN7tY",
      externalLink: "https://open.spotify.com/track/02E2iNkWn6VTWWfbwrN7tY",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "True Love",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" }],
  trackKey: "truelove|66CXWjxzNUsdJxJ2JdwvnR|166237",
  song: "song/ariana-grande-true-love",
} as const satisfies Track
