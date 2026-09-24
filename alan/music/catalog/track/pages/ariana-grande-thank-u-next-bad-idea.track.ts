import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeThankUNextBadIdea = {
  id: "01a0a6c5-280d-7a5a-b58b-915dc1af6afa",
  type: "page-type/track",
  slug: "ariana-grande-thank-u-next-bad-idea",
  ownLength: 4.451766666666667,
  ownProgress: 4.451766666666667,
  partOfCollections: ["release/ariana-grande-thank-u-next"],
  status: "completed",
  unit: "unit/minutes",
  title: "bad idea",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/ariana-grande" }],
  trackKey: "badidea|66CXWjxzNUsdJxJ2JdwvnR|267106",
  song: "song/ariana-grande-bad-idea",
  carriedBy: [
    {
      release: "release/ariana-grande-thank-u-next",
      discNumber: 1,
      position: 6,
      externalId: "5Il6Oe7lr5XM7A0cWbVQtr",
      externalLink: "https://open.spotify.com/track/5Il6Oe7lr5XM7A0cWbVQtr",
    },
  ],
} as const satisfies Track
