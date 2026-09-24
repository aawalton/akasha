import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeMyEverythingDeluxeLoveMeHarder = {
  id: "01a0a6c5-2e77-7cba-a1b9-dbaad0760204",
  type: "page-type/track",
  slug: "ariana-grande-my-everything-deluxe-love-me-harder",
  ownLength: 3.93555,
  ownProgress: 3.93555,
  partOfCollections: ["release/ariana-grande-my-everything-deluxe"],
  status: "completed",
  unit: "unit/minutes",
  title: "Love Me Harder",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/ariana-grande" }, { artistName: "The Weeknd" }],
  trackKey: "lovemeharder|1Xyo4u8uXC1ZmMpatF05PJ,66CXWjxzNUsdJxJ2JdwvnR|236133",
  song: "song/ariana-grande-love-me-harder",
  carriedBy: [
    {
      release: "release/ariana-grande-my-everything-deluxe",
      discNumber: 1,
      position: 9,
      externalId: "5J4ZkQpzMUFojo1CtAZYpn",
      externalLink: "https://open.spotify.com/track/5J4ZkQpzMUFojo1CtAZYpn",
    },
  ],
} as const satisfies Track
