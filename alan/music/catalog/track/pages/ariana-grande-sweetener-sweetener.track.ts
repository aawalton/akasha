import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeSweetenerSweetener = {
  id: "01a0a6c5-29b6-7fb7-a530-7e4e3cc0cbeb",
  type: "page-type/track",
  slug: "ariana-grande-sweetener-sweetener",
  ownLength: 3.4748833333333335,
  ownProgress: 3.4748833333333335,
  partOfCollections: ["release/ariana-grande-sweetener"],
  status: "completed",
  unit: "unit/minutes",
  title: "sweetener",
  trackType: "studio",
  explicit: true,
  trackArtist: [{ artist: "artist/ariana-grande" }],
  trackKey: "sweetener|66CXWjxzNUsdJxJ2JdwvnR|208493",
  song: "song/ariana-grande-sweetener",
  carriedBy: [
    {
      release: "release/ariana-grande-sweetener",
      discNumber: 1,
      position: 6,
      externalId: "70khXICDeTTxgYtw3EysKH",
      externalLink: "https://open.spotify.com/track/70khXICDeTTxgYtw3EysKH",
    },
  ],
} as const satisfies Track
