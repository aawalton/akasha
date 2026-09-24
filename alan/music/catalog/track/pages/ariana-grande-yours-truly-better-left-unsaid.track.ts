import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeYoursTrulyBetterLeftUnsaid = {
  id: "01a0a6c5-30e5-7847-ab2e-371bb8413588",
  type: "page-type/track",
  slug: "ariana-grande-yours-truly-better-left-unsaid",
  ownLength: 3.5204333333333335,
  ownProgress: 3.5204333333333335,
  partOfCollections: ["release/ariana-grande-yours-truly"],
  status: "completed",
  unit: "unit/minutes",
  title: "Better Left Unsaid",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/ariana-grande" }],
  trackKey: "betterleftunsaid|66CXWjxzNUsdJxJ2JdwvnR|211226",
  song: "song/ariana-grande-better-left-unsaid",
  carriedBy: [
    {
      release: "release/ariana-grande-yours-truly",
      discNumber: 1,
      position: 12,
      externalId: "5Pnny78GESkBSLnxFmhRYZ",
      externalLink: "https://open.spotify.com/track/5Pnny78GESkBSLnxFmhRYZ",
    },
  ],
} as const satisfies Track
