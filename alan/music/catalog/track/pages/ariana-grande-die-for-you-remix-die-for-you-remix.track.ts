import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeDieForYouRemixDieForYouRemix = {
  id: "01a0a6c5-3639-73cf-8793-490a07a547bd",
  type: "page-type/track",
  slug: "ariana-grande-die-for-you-remix-die-for-you-remix",
  ownLength: 3.88095,
  ownProgress: 3.88095,
  partOfCollections: ["release/ariana-grande-die-for-you-remix"],
  status: "completed",
  unit: "unit/minutes",
  title: "Die For You - Remix",
  trackType: "remix",
  explicit: false,
  trackArtist: [{ artistName: "The Weeknd" }, { artist: "artist/ariana-grande" }],
  trackKey: "dieforyouremix|1Xyo4u8uXC1ZmMpatF05PJ,66CXWjxzNUsdJxJ2JdwvnR|232857",
  song: "song/ariana-grande-die-for-you",
  carriedBy: [
    {
      release: "release/ariana-grande-die-for-you-remix",
      discNumber: 1,
      position: 1,
      externalId: "7oDd86yk8itslrA9HRP2ki",
      externalLink: "https://open.spotify.com/track/7oDd86yk8itslrA9HRP2ki",
    },
  ],
} as const satisfies Track
