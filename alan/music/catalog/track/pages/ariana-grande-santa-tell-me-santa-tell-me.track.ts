import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeSantaTellMeSantaTellMe = {
  id: "01a0a6c5-3aec-7297-a668-1e6fbf401152",
  type: "page-type/track",
  slug: "ariana-grande-santa-tell-me-santa-tell-me",
  ownLength: 3.40155,
  ownProgress: 3.40155,
  partOfCollections: ["release/ariana-grande-santa-tell-me"],
  status: "completed",
  unit: "unit/minutes",
  title: "Santa Tell Me",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/ariana-grande" }],
  trackKey: "santatellme|66CXWjxzNUsdJxJ2JdwvnR|204093",
  song: "song/ariana-grande-santa-tell-me",
  carriedBy: [
    {
      release: "release/ariana-grande-santa-tell-me",
      discNumber: 1,
      position: 1,
      externalId: "0lizgQ7Qw35od7CYaoMBZb",
      externalLink: "https://open.spotify.com/track/0lizgQ7Qw35od7CYaoMBZb",
    },
  ],
} as const satisfies Track
