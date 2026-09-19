import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeMyEverythingDeluxeJustALittleBitOfYourHeart = {
  id: "01a0a6c5-2ea5-79de-9eb2-283448adff07",
  type: "page-type/track",
  slug: "ariana-grande-my-everything-deluxe-just-a-little-bit-of-your-heart",
  ownLength: 3.8764333333333334,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-my-everything-deluxe"],
  position: 10,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5lvnGiTAH9BVlJLHc0DXZz",
      externalLink: "https://open.spotify.com/track/5lvnGiTAH9BVlJLHc0DXZz",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Just A Little Bit Of Your Heart",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" }],
  trackKey: "justalittlebitofyourheart|66CXWjxzNUsdJxJ2JdwvnR|232586",
  song: "song/ariana-grande-just-a-little-bit-of-your-heart",
} as const satisfies Track
