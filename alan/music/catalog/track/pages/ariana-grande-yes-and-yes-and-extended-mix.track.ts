import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeYesAndYesAndExtendedMix = {
  id: "01a0a6c5-34ac-703e-befd-af67d7c37d14",
  type: "page-type/track",
  slug: "ariana-grande-yes-and-yes-and-extended-mix",
  ownLength: 5.136733333333333,
  ownProgress: 5.136733333333333,
  partOfCollections: ["release/ariana-grande-yes-and"],
  status: "completed",
  unit: "unit/minutes",
  title: "yes, and? - extended mix",
  trackType: "remix",
  explicit: true,
  trackArtist: [{ artist: "artist/ariana-grande" }],
  trackKey: "yesandextendedmix|66CXWjxzNUsdJxJ2JdwvnR|308204",
  song: "song/ariana-grande-yes-and",
  carriedBy: [
    {
      release: "release/ariana-grande-yes-and",
      discNumber: 1,
      position: 3,
      externalId: "12SdfiD7MIRteeIXWdvxpl",
      externalLink: "https://open.spotify.com/track/12SdfiD7MIRteeIXWdvxpl",
    },
  ],
} as const satisfies Track
