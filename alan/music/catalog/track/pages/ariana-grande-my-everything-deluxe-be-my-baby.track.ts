import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeMyEverythingDeluxeBeMyBaby = {
  id: "01a0a6c5-2e2c-745d-9087-ea8221b89405",
  type: "page-type/track",
  slug: "ariana-grande-my-everything-deluxe-be-my-baby",
  ownLength: 3.61755,
  ownProgress: 3.61755,
  partOfCollections: ["release/ariana-grande-my-everything-deluxe"],
  status: "completed",
  unit: "unit/minutes",
  title: "Be My Baby",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/ariana-grande" }, { artistName: "Cashmere Cat" }],
  trackKey: "bemybaby|2LZDXcxJWgsJfKXZv9a5eG,66CXWjxzNUsdJxJ2JdwvnR|217053",
  song: "song/ariana-grande-be-my-baby",
  carriedBy: [
    {
      release: "release/ariana-grande-my-everything-deluxe",
      discNumber: 1,
      position: 7,
      externalId: "0fonaf88IEDQM309zmU80L",
      externalLink: "https://open.spotify.com/track/0fonaf88IEDQM309zmU80L",
    },
  ],
} as const satisfies Track
