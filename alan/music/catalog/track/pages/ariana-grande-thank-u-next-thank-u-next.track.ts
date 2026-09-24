import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeThankUNextThankUNext = {
  id: "01a0a6c5-28c5-77ce-b06e-190652714c8b",
  type: "page-type/track",
  slug: "ariana-grande-thank-u-next-thank-u-next",
  ownLength: 3.4553333333333334,
  ownProgress: 3.4553333333333334,
  partOfCollections: ["release/ariana-grande-thank-u-next"],
  status: "completed",
  unit: "unit/minutes",
  title: "thank u, next",
  trackType: "studio",
  explicit: true,
  trackArtist: [{ artist: "artist/ariana-grande" }],
  trackKey: "thankunext|66CXWjxzNUsdJxJ2JdwvnR|207320",
  song: "song/ariana-grande-thank-u-next",
  carriedBy: [
    {
      release: "release/ariana-grande-thank-u-next",
      discNumber: 1,
      position: 11,
      externalId: "3e9HZxeyfWwjeyPAMmWSSQ",
      externalLink: "https://open.spotify.com/track/3e9HZxeyfWwjeyPAMmWSSQ",
    },
  ],
} as const satisfies Track
