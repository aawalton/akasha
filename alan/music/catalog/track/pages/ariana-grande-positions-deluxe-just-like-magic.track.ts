import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandePositionsDeluxeJustLikeMagic = {
  id: "01a0a6c5-1f35-73f5-b2f5-ac4bbe6f9fdb",
  type: "page-type/track",
  slug: "ariana-grande-positions-deluxe-just-like-magic",
  ownLength: 2.4983333333333335,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-positions-deluxe"],
  position: 4,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1N9hFgcgWYbGINUKjhvcK6",
      externalLink: "https://open.spotify.com/track/1N9hFgcgWYbGINUKjhvcK6",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "just like magic",
  discNumber: 1,
  explicit: true,
  trackArtist: [{ externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" }],
  trackKey: "justlikemagic|66CXWjxzNUsdJxJ2JdwvnR|149900",
} as const satisfies Track
