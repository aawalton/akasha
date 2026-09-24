import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeYoursTrulyBabyI = {
  id: "01a0a6c5-2f86-7514-b2ba-e1377a177bca",
  type: "page-type/track",
  slug: "ariana-grande-yours-truly-baby-i",
  ownLength: 3.2933333333333334,
  ownProgress: 3.2933333333333334,
  partOfCollections: ["release/ariana-grande-yours-truly"],
  status: "completed",
  unit: "unit/minutes",
  title: "Baby I",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/ariana-grande" }],
  trackKey: "babyi|66CXWjxzNUsdJxJ2JdwvnR|197600",
  song: "song/ariana-grande-baby-i",
  carriedBy: [
    {
      release: "release/ariana-grande-yours-truly",
      discNumber: 1,
      position: 2,
      externalId: "6EIsMa5lbvljYxqCkjZVDi",
      externalLink: "https://open.spotify.com/track/6EIsMa5lbvljYxqCkjZVDi",
    },
  ],
} as const satisfies Track
