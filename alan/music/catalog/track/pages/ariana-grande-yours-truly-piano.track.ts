import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeYoursTrulyPiano = {
  id: "01a0a6c5-3008-7a66-8a09-5209b05b0193",
  type: "page-type/track",
  slug: "ariana-grande-yours-truly-piano",
  ownLength: 3.9071,
  ownProgress: 3.9071,
  partOfCollections: [
    "release/ariana-grande-yours-truly",
    "release/ariana-grande-yours-truly-tenth-anniversary-edition",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "Piano",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/ariana-grande" }],
  trackKey: "piano|66CXWjxzNUsdJxJ2JdwvnR|234426",
  song: "song/ariana-grande-piano",
  carriedBy: [
    {
      release: "release/ariana-grande-yours-truly",
      discNumber: 1,
      position: 6,
      externalId: "1xCqIXCApBgcjwRLostpKl",
      externalLink: "https://open.spotify.com/track/1xCqIXCApBgcjwRLostpKl",
    },
    {
      release: "release/ariana-grande-yours-truly-tenth-anniversary-edition",
      discNumber: 1,
      position: 6,
      externalId: "1WPjEBaYjOh65gQF7EwwOp",
      externalLink: "https://open.spotify.com/track/1WPjEBaYjOh65gQF7EwwOp",
    },
  ],
} as const satisfies Track
