import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeSweetenerREM = {
  id: "01a0a6c5-2976-72e2-9640-585eaba39850",
  type: "page-type/track",
  slug: "ariana-grande-sweetener-r-e-m",
  ownLength: 4.094433333333333,
  ownProgress: 4.094433333333333,
  partOfCollections: ["release/ariana-grande-sweetener"],
  status: "completed",
  unit: "unit/minutes",
  title: "R.E.M",
  trackType: "studio",
  explicit: true,
  trackArtist: [{ artist: "artist/ariana-grande" }],
  trackKey: "rem|66CXWjxzNUsdJxJ2JdwvnR|245666",
  song: "song/ariana-grande-r-e-m",
  carriedBy: [
    {
      release: "release/ariana-grande-sweetener",
      discNumber: 1,
      position: 4,
      externalId: "1xWH8zYtDeS9mW1JJG23VZ",
      externalLink: "https://open.spotify.com/track/1xWH8zYtDeS9mW1JJG23VZ",
    },
  ],
} as const satisfies Track
