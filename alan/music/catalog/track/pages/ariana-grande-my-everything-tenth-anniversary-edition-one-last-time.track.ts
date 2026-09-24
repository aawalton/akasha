import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeMyEverythingTenthAnniversaryEditionOneLastTime = {
  id: "01a0a6c5-1660-7b36-a28b-f4c28e519c16",
  type: "page-type/track",
  slug: "ariana-grande-my-everything-tenth-anniversary-edition-one-last-time",
  ownLength: 3.2879666666666667,
  ownProgress: 3.2879666666666667,
  partOfCollections: [
    "release/ariana-grande-my-everything-tenth-anniversary-edition",
    "release/ariana-grande-one-last-time",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "One Last Time",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/ariana-grande" }],
  trackKey: "onelasttime|66CXWjxzNUsdJxJ2JdwvnR|197278",
  song: "song/ariana-grande-one-last-time",
  carriedBy: [
    {
      release: "release/ariana-grande-my-everything-tenth-anniversary-edition",
      discNumber: 1,
      position: 3,
      externalId: "0e6qFb4yA7MkyHA9Cpb6c1",
      externalLink: "https://open.spotify.com/track/0e6qFb4yA7MkyHA9Cpb6c1",
    },
    {
      release: "release/ariana-grande-one-last-time",
      discNumber: 1,
      position: 1,
      externalId: "1043bXNgWDCWM2rhvieIh9",
      externalLink: "https://open.spotify.com/track/1043bXNgWDCWM2rhvieIh9",
    },
  ],
} as const satisfies Track
