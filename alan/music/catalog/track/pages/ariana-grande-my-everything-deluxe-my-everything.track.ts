import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeMyEverythingDeluxeMyEverything = {
  id: "01a0a6c5-2ee8-7906-b40e-cc7ca7ae1779",
  type: "page-type/track",
  slug: "ariana-grande-my-everything-deluxe-my-everything",
  ownLength: 2.808666666666667,
  ownProgress: 2.808666666666667,
  partOfCollections: ["release/ariana-grande-my-everything-deluxe"],
  status: "completed",
  unit: "unit/minutes",
  title: "My Everything",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/ariana-grande" }],
  trackKey: "myeverything|66CXWjxzNUsdJxJ2JdwvnR|168520",
  song: "song/ariana-grande-my-everything",
  carriedBy: [
    {
      release: "release/ariana-grande-my-everything-deluxe",
      discNumber: 1,
      position: 12,
      externalId: "4eumFsTnduH3zRfaASoAPs",
      externalLink: "https://open.spotify.com/track/4eumFsTnduH3zRfaASoAPs",
    },
  ],
} as const satisfies Track
