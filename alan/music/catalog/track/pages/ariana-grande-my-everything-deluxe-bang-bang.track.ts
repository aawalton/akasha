import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeMyEverythingDeluxeBangBang = {
  id: "01a0a6c5-2f07-7955-8461-d877072be85c",
  type: "page-type/track",
  slug: "ariana-grande-my-everything-deluxe-bang-bang",
  ownLength: 3.322,
  ownProgress: 3.322,
  partOfCollections: ["release/ariana-grande-my-everything-deluxe"],
  status: "completed",
  unit: "unit/minutes",
  title: "Bang Bang",
  trackType: "studio",
  explicit: false,
  trackArtist: [
    { artistName: "Jessie J" },
    { artist: "artist/ariana-grande" },
    { artistName: "Nicki Minaj" },
  ],
  trackKey: "bangbang|0hCNtLu0JehylgoiP8L4Gh,2gsggkzM5R49q6jpPvazou,66CXWjxzNUsdJxJ2JdwvnR|199320",
  song: "song/ariana-grande-bang-bang",
  carriedBy: [
    {
      release: "release/ariana-grande-my-everything-deluxe",
      discNumber: 1,
      position: 13,
      externalId: "466s1BacUmiRdR3ISvNjyx",
      externalLink: "https://open.spotify.com/track/466s1BacUmiRdR3ISvNjyx",
    },
  ],
} as const satisfies Track
