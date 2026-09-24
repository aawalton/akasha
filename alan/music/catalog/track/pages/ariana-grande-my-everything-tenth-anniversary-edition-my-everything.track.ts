import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeMyEverythingTenthAnniversaryEditionMyEverything = {
  id: "01a0a6c5-179e-7684-9e4c-b428392ddeb9",
  type: "page-type/track",
  slug: "ariana-grande-my-everything-tenth-anniversary-edition-my-everything",
  ownLength: 2.8079666666666667,
  ownProgress: 2.8079666666666667,
  partOfCollections: ["release/ariana-grande-my-everything-tenth-anniversary-edition"],
  status: "completed",
  unit: "unit/minutes",
  title: "My Everything",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/ariana-grande" }],
  trackKey: "myeverything|66CXWjxzNUsdJxJ2JdwvnR|168478",
  song: "song/ariana-grande-my-everything",
  carriedBy: [
    {
      release: "release/ariana-grande-my-everything-tenth-anniversary-edition",
      discNumber: 1,
      position: 12,
      externalId: "7ELQqHFR2EiwVQTbdsRWHm",
      externalLink: "https://open.spotify.com/track/7ELQqHFR2EiwVQTbdsRWHm",
    },
  ],
} as const satisfies Track
