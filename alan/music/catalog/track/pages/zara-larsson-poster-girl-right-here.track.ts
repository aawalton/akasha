import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const zaraLarssonPosterGirlRightHere = {
  id: "01a0aa7c-3094-7f9f-a8dd-67d6992a5040",
  type: "page-type/track",
  slug: "zara-larsson-poster-girl-right-here",
  ownLength: 3.7706166666666667,
  ownProgress: 0,
  partOfCollections: ["release/zara-larsson-poster-girl"],
  position: 4,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5Wlft6NsN2G4EyXY7tR8hj",
      externalLink: "https://open.spotify.com/track/5Wlft6NsN2G4EyXY7tR8hj",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Right Here",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "1Xylc3o4UrD53lo9CvFvVg", artistName: "Zara Larsson" }],
  trackKey: "righthere|1Xylc3o4UrD53lo9CvFvVg|226237",
  song: "song/zara-larsson-right-here",
} as const satisfies Track
