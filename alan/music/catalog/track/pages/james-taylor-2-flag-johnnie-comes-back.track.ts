import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2FlagJohnnieComesBack = {
  id: "01a0abeb-4497-72bb-b277-21fc4ffe3d3f",
  type: "page-type/track",
  slug: "james-taylor-2-flag-johnnie-comes-back",
  ownLength: 3.9,
  ownProgress: 3.9,
  partOfCollections: ["release/james-taylor-2-flag"],
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0gRgLB1nTW0Yb9mgWQuvDn",
      externalLink: "https://open.spotify.com/track/0gRgLB1nTW0Yb9mgWQuvDn",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Johnnie Comes Back",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0vn7UBvSQECKJm2817Yf1P", artistName: "James Taylor" }],
  trackKey: "johnniecomesback|0vn7UBvSQECKJm2817Yf1P|234000",
  song: "song/james-taylor-johnnie-comes-back",
  carriedBy: [
    {
      release: "release/james-taylor-2-flag",
      discNumber: 1,
      position: 2,
      externalId: "0gRgLB1nTW0Yb9mgWQuvDn",
      externalLink: "https://open.spotify.com/track/0gRgLB1nTW0Yb9mgWQuvDn",
    },
  ],
} as const satisfies Track
