import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeDieForYouRemixDieForYouRemix = {
  id: "01a0a6c5-3639-73cf-8793-490a07a547bd",
  type: "page-type/track",
  slug: "ariana-grande-die-for-you-remix-die-for-you-remix",
  ownLength: 3.88095,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-die-for-you-remix"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7oDd86yk8itslrA9HRP2ki",
      externalLink: "https://open.spotify.com/track/7oDd86yk8itslrA9HRP2ki",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Die For You - Remix",
  trackType: "remix",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "1Xyo4u8uXC1ZmMpatF05PJ", artistName: "The Weeknd" },
    { externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" },
  ],
  trackKey: "dieforyouremix|1Xyo4u8uXC1ZmMpatF05PJ,66CXWjxzNUsdJxJ2JdwvnR|232857",
  song: "song/ariana-grande-die-for-you",
} as const satisfies Track
