import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeMyEverythingDeluxeOnly1 = {
  id: "01a0a6c5-2f26-75de-a7f0-de0139824ee1",
  type: "page-type/track",
  slug: "ariana-grande-my-everything-deluxe-only-1",
  ownLength: 3.2331,
  ownProgress: 3.2331,
  partOfCollections: ["release/ariana-grande-my-everything-deluxe"],
  status: "completed",
  unit: "unit/minutes",
  title: "Only 1",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/ariana-grande" }],
  trackKey: "only1|66CXWjxzNUsdJxJ2JdwvnR|193986",
  song: "song/ariana-grande-only-1",
  carriedBy: [
    {
      release: "release/ariana-grande-my-everything-deluxe",
      discNumber: 1,
      position: 14,
      externalId: "6LQzYkmd8ADbKOOEVDnlG4",
      externalLink: "https://open.spotify.com/track/6LQzYkmd8ADbKOOEVDnlG4",
    },
  ],
} as const satisfies Track
