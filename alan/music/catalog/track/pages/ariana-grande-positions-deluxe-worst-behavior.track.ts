import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandePositionsDeluxeWorstBehavior = {
  id: "01a0a6c5-20e9-7dd7-82d8-02ca718690f7",
  type: "page-type/track",
  slug: "ariana-grande-positions-deluxe-worst-behavior",
  ownLength: 2.07135,
  ownProgress: 2.07135,
  partOfCollections: ["release/ariana-grande-positions-deluxe"],
  status: "completed",
  unit: "unit/minutes",
  title: "worst behavior",
  trackType: "studio",
  explicit: true,
  trackArtist: [{ artist: "artist/ariana-grande" }],
  trackKey: "worstbehavior|66CXWjxzNUsdJxJ2JdwvnR|124281",
  song: "song/ariana-grande-worst-behavior",
  carriedBy: [
    {
      release: "release/ariana-grande-positions-deluxe",
      discNumber: 1,
      position: 18,
      externalId: "6KIKaWKE9wV6mLjho3w61y",
      externalLink: "https://open.spotify.com/track/6KIKaWKE9wV6mLjho3w61y",
    },
  ],
} as const satisfies Track
