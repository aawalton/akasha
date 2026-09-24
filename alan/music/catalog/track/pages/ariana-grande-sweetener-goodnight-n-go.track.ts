import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeSweetenerGoodnightNGo = {
  id: "01a0a6c5-2a9a-7f85-85ad-80cb45043af5",
  type: "page-type/track",
  slug: "ariana-grande-sweetener-goodnight-n-go",
  ownLength: 3.1584333333333334,
  ownProgress: 3.1584333333333334,
  partOfCollections: ["release/ariana-grande-sweetener"],
  status: "completed",
  unit: "unit/minutes",
  title: "goodnight n go",
  trackType: "studio",
  explicit: true,
  trackArtist: [{ artist: "artist/ariana-grande" }],
  trackKey: "goodnightngo|66CXWjxzNUsdJxJ2JdwvnR|189506",
  song: "song/ariana-grande-goodnight-n-go",
  carriedBy: [
    {
      release: "release/ariana-grande-sweetener",
      discNumber: 1,
      position: 13,
      externalId: "14kYOiFVPb7E7NfFbqhdln",
      externalLink: "https://open.spotify.com/track/14kYOiFVPb7E7NfFbqhdln",
    },
  ],
} as const satisfies Track
