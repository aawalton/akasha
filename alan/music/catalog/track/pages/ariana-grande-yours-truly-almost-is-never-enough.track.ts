import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeYoursTrulyAlmostIsNeverEnough = {
  id: "01a0a6c5-309c-7a43-b9fe-e25a9a0bc4d7",
  type: "page-type/track",
  slug: "ariana-grande-yours-truly-almost-is-never-enough",
  ownLength: 5.462883333333333,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-yours-truly"],
  position: 10,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "63bo7NDoWdMFXufhsYOxwG",
      externalLink: "https://open.spotify.com/track/63bo7NDoWdMFXufhsYOxwG",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Almost Is Never Enough",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" },
    { externalId: "2Rf4X6m0oayCJhaJ5K63GQ", artistName: "Nathan Sykes" },
  ],
  trackKey: "almostisneverenough|2Rf4X6m0oayCJhaJ5K63GQ,66CXWjxzNUsdJxJ2JdwvnR|327773",
  song: "song/ariana-grande-almost-is-never-enough",
} as const satisfies Track
