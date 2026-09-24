import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeSantaCanTYouHearMeLiveSantaCantYouHearMe = {
  id: "01a0a6c5-3683-71c2-a0fd-f1d71ffd4da1",
  type: "page-type/track",
  slug: "ariana-grande-santa-can-t-you-hear-me-live-santa-cant-you-hear-me",
  ownLength: 4.044066666666667,
  ownProgress: 4.044066666666667,
  partOfCollections: [
    "release/ariana-grande-santa-can-t-you-hear-me-live",
    "release/ariana-grande-santa-can-t-you-hear-me",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "Santa, Can’t You Hear Me",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/kelly-clarkson" }, { artist: "artist/ariana-grande" }],
  trackKey: "santacantyouhearme|3BmGtnKgCSGYIUhmivXKWX,66CXWjxzNUsdJxJ2JdwvnR|242644",
  song: "song/kelly-clarkson-santa-cant-you-hear-me",
  carriedBy: [
    {
      release: "release/ariana-grande-santa-can-t-you-hear-me",
      discNumber: 1,
      position: 1,
      externalId: "7B9SFykXtlvM2YCjKwyULL",
      externalLink: "https://open.spotify.com/track/7B9SFykXtlvM2YCjKwyULL",
    },
    {
      release: "release/ariana-grande-santa-can-t-you-hear-me-live",
      discNumber: 1,
      position: 2,
      externalId: "5XDcWDGnFLs3P3F0XfIpgN",
      externalLink: "https://open.spotify.com/track/5XDcWDGnFLs3P3F0XfIpgN",
    },
  ],
} as const satisfies Track
