import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeThankUNextMakeUp = {
  id: "01a0a6c5-2832-71ff-b27e-1e128af60607",
  type: "page-type/track",
  slug: "ariana-grande-thank-u-next-make-up",
  ownLength: 2.344883333333333,
  ownProgress: 2.344883333333333,
  partOfCollections: ["release/ariana-grande-thank-u-next"],
  status: "completed",
  unit: "unit/minutes",
  title: "make up",
  trackType: "studio",
  explicit: true,
  trackArtist: [{ artist: "artist/ariana-grande" }],
  trackKey: "makeup|66CXWjxzNUsdJxJ2JdwvnR|140693",
  song: "song/ariana-grande-make-up",
  carriedBy: [
    {
      release: "release/ariana-grande-thank-u-next",
      discNumber: 1,
      position: 7,
      externalId: "27356GVuMPFWiJSZCragoM",
      externalLink: "https://open.spotify.com/track/27356GVuMPFWiJSZCragoM",
    },
  ],
} as const satisfies Track
