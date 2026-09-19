import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeDangerousWomanThinkingBoutYou = {
  id: "01a0a6c5-2cf7-7a15-88e6-9d4bbb432c94",
  type: "page-type/track",
  slug: "ariana-grande-dangerous-woman-thinking-bout-you",
  ownLength: 3.3397666666666668,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-dangerous-woman"],
  position: 15,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "28tmK8wkE9y1UHdBKLd0nA",
      externalLink: "https://open.spotify.com/track/28tmK8wkE9y1UHdBKLd0nA",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Thinking Bout You",
  trackType: "studio",
  discNumber: 1,
  explicit: true,
  trackArtist: [{ externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" }],
  trackKey: "thinkingboutyou|66CXWjxzNUsdJxJ2JdwvnR|200386",
  song: "song/ariana-grande-thinking-bout-you",
} as const satisfies Track
