import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeDangerousWomanBadDecisions = {
  id: "01a0a6c5-2c9b-7001-908a-1f342615cda0",
  type: "page-type/track",
  slug: "ariana-grande-dangerous-woman-bad-decisions",
  ownLength: 3.7737666666666665,
  ownProgress: 3.7737666666666665,
  partOfCollections: ["release/ariana-grande-dangerous-woman"],
  status: "completed",
  unit: "unit/minutes",
  title: "Bad Decisions",
  trackType: "studio",
  explicit: true,
  trackArtist: [{ artist: "artist/ariana-grande" }],
  trackKey: "baddecisions|66CXWjxzNUsdJxJ2JdwvnR|226426",
  song: "song/ariana-grande-bad-decisions",
  carriedBy: [
    {
      release: "release/ariana-grande-dangerous-woman",
      discNumber: 1,
      position: 12,
      externalId: "76RIfPBraSmXWC9LryUztF",
      externalLink: "https://open.spotify.com/track/76RIfPBraSmXWC9LryUztF",
    },
  ],
} as const satisfies Track
