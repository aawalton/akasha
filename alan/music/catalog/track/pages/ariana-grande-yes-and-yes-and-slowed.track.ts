import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeYesAndYesAndSlowed = {
  id: "01a0a6c5-350b-7c4d-8c9c-9eeedb7ebfed",
  type: "page-type/track",
  slug: "ariana-grande-yes-and-yes-and-slowed",
  ownLength: 4.021616666666667,
  ownProgress: 4.021616666666667,
  partOfCollections: ["release/ariana-grande-yes-and"],
  status: "completed",
  unit: "unit/minutes",
  title: "yes, and? - slowed",
  trackType: "version",
  explicit: true,
  trackArtist: [{ artist: "artist/ariana-grande" }],
  trackKey: "yesandslowed|66CXWjxzNUsdJxJ2JdwvnR|241297",
  song: "song/ariana-grande-yes-and",
  carriedBy: [
    {
      release: "release/ariana-grande-yes-and",
      discNumber: 1,
      position: 6,
      externalId: "0WUfD4IZdOgo85xz3YX3oh",
      externalLink: "https://open.spotify.com/track/0WUfD4IZdOgo85xz3YX3oh",
    },
  ],
} as const satisfies Track
