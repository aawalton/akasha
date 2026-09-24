import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeDangerousWomanTouchIt = {
  id: "01a0a6c5-2cba-72cf-a89d-d9da9042098c",
  type: "page-type/track",
  slug: "ariana-grande-dangerous-woman-touch-it",
  ownLength: 4.333333333333333,
  ownProgress: 4.333333333333333,
  partOfCollections: ["release/ariana-grande-dangerous-woman"],
  status: "completed",
  unit: "unit/minutes",
  title: "Touch It",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/ariana-grande" }],
  trackKey: "touchit|66CXWjxzNUsdJxJ2JdwvnR|260000",
  song: "song/ariana-grande-touch-it",
  carriedBy: [
    {
      release: "release/ariana-grande-dangerous-woman",
      discNumber: 1,
      position: 13,
      externalId: "7rlKlsYacU3PFLGD7ca1HL",
      externalLink: "https://open.spotify.com/track/7rlKlsYacU3PFLGD7ca1HL",
    },
  ],
} as const satisfies Track
