import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandePositionsDeluxeMainThing = {
  id: "01a0a6c5-210b-7811-a17c-42da84a1d0c5",
  type: "page-type/track",
  slug: "ariana-grande-positions-deluxe-main-thing",
  ownLength: 2.1513333333333335,
  ownProgress: 2.1513333333333335,
  partOfCollections: ["release/ariana-grande-positions-deluxe"],
  status: "completed",
  unit: "unit/minutes",
  title: "main thing",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/ariana-grande" }],
  trackKey: "mainthing|66CXWjxzNUsdJxJ2JdwvnR|129080",
  song: "song/ariana-grande-main-thing",
  carriedBy: [
    {
      release: "release/ariana-grande-positions-deluxe",
      discNumber: 1,
      position: 19,
      externalId: "63WsFFnQ8CL941iZBELYsX",
      externalLink: "https://open.spotify.com/track/63WsFFnQ8CL941iZBELYsX",
    },
  ],
} as const satisfies Track
