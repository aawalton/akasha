import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeDangerousWomanSometimes = {
  id: "01a0a6c5-2c5e-7479-a055-aec96131a299",
  type: "page-type/track",
  slug: "ariana-grande-dangerous-woman-sometimes",
  ownLength: 3.7777666666666665,
  ownProgress: 3.7777666666666665,
  partOfCollections: [
    "release/ariana-grande-dangerous-woman",
    "release/ariana-grande-dangerous-woman-tenth-anniversary-edition",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "Sometimes",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/ariana-grande" }],
  trackKey: "sometimes|66CXWjxzNUsdJxJ2JdwvnR|226666",
  song: "song/ariana-grande-sometimes",
  carriedBy: [
    {
      release: "release/ariana-grande-dangerous-woman",
      discNumber: 1,
      position: 10,
      externalId: "7IqSduDsieo2epoqA97NxC",
      externalLink: "https://open.spotify.com/track/7IqSduDsieo2epoqA97NxC",
    },
    {
      release: "release/ariana-grande-dangerous-woman-tenth-anniversary-edition",
      discNumber: 1,
      position: 10,
      externalId: "3a1mMCctccHQQH52l15nmJ",
      externalLink: "https://open.spotify.com/track/3a1mMCctccHQQH52l15nmJ",
    },
  ],
} as const satisfies Track
