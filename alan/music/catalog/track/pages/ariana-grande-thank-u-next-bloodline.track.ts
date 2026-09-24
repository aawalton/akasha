import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeThankUNextBloodline = {
  id: "01a0a6c5-27c4-7855-ae92-11ec1b9b1ee6",
  type: "page-type/track",
  slug: "ariana-grande-thank-u-next-bloodline",
  ownLength: 3.6148833333333332,
  ownProgress: 3.6148833333333332,
  partOfCollections: ["release/ariana-grande-thank-u-next"],
  status: "completed",
  unit: "unit/minutes",
  title: "bloodline",
  trackType: "studio",
  explicit: true,
  trackArtist: [{ artist: "artist/ariana-grande" }],
  trackKey: "bloodline|66CXWjxzNUsdJxJ2JdwvnR|216893",
  song: "song/ariana-grande-bloodline",
  carriedBy: [
    {
      release: "release/ariana-grande-thank-u-next",
      discNumber: 1,
      position: 4,
      externalId: "2hloaUoRonYssMuqLCBLTX",
      externalLink: "https://open.spotify.com/track/2hloaUoRonYssMuqLCBLTX",
    },
  ],
} as const satisfies Track
