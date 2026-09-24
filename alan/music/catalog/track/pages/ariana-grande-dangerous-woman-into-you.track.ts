import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeDangerousWomanIntoYou = {
  id: "01a0a6c5-2b81-749b-8aaa-938d7c17608e",
  type: "page-type/track",
  slug: "ariana-grande-dangerous-woman-into-you",
  ownLength: 4.074,
  ownProgress: 4.074,
  partOfCollections: ["release/ariana-grande-dangerous-woman"],
  status: "completed",
  unit: "unit/minutes",
  title: "Into You",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/ariana-grande" }],
  trackKey: "intoyou|66CXWjxzNUsdJxJ2JdwvnR|244440",
  song: "song/ariana-grande-into-you",
  carriedBy: [
    {
      release: "release/ariana-grande-dangerous-woman",
      discNumber: 1,
      position: 4,
      externalId: "49gRYU6hBWgSH2JVixGkJq",
      externalLink: "https://open.spotify.com/track/49gRYU6hBWgSH2JVixGkJq",
    },
  ],
} as const satisfies Track
