import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeDangerousWomanBeAlright = {
  id: "01a0a6c5-2b5c-7e71-a5f2-b695f03b5a0c",
  type: "page-type/track",
  slug: "ariana-grande-dangerous-woman-be-alright",
  ownLength: 2.9882166666666667,
  ownProgress: 2.9882166666666667,
  partOfCollections: ["release/ariana-grande-dangerous-woman"],
  status: "completed",
  unit: "unit/minutes",
  title: "Be Alright",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/ariana-grande" }],
  trackKey: "bealright|66CXWjxzNUsdJxJ2JdwvnR|179293",
  song: "song/ariana-grande-be-alright",
  carriedBy: [
    {
      release: "release/ariana-grande-dangerous-woman",
      discNumber: 1,
      position: 3,
      externalId: "1MkFj1ThZZxjYMNkczx9mk",
      externalLink: "https://open.spotify.com/track/1MkFj1ThZZxjYMNkczx9mk",
    },
  ],
} as const satisfies Track
