import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeDangerousWomanIDontCare = {
  id: "01a0a6c5-2c7d-71e4-8b58-5e504a329b30",
  type: "page-type/track",
  slug: "ariana-grande-dangerous-woman-i-dont-care",
  ownLength: 2.9671,
  ownProgress: 2.9671,
  partOfCollections: ["release/ariana-grande-dangerous-woman"],
  status: "completed",
  unit: "unit/minutes",
  title: "I Don't Care",
  trackType: "studio",
  explicit: true,
  trackArtist: [{ artist: "artist/ariana-grande" }],
  trackKey: "idontcare|66CXWjxzNUsdJxJ2JdwvnR|178026",
  song: "song/ariana-grande-i-don-t-care",
  carriedBy: [
    {
      release: "release/ariana-grande-dangerous-woman",
      discNumber: 1,
      position: 11,
      externalId: "7xagQoIf776ukUlgH4TyyB",
      externalLink: "https://open.spotify.com/track/7xagQoIf776ukUlgH4TyyB",
    },
  ],
} as const satisfies Track
