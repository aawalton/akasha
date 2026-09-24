import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeDangerousWomanThinkingBoutYou = {
  id: "01a0a6c5-2cf7-7a15-88e6-9d4bbb432c94",
  type: "page-type/track",
  slug: "ariana-grande-dangerous-woman-thinking-bout-you",
  ownLength: 3.3397666666666668,
  ownProgress: 3.3397666666666668,
  partOfCollections: ["release/ariana-grande-dangerous-woman"],
  status: "completed",
  unit: "unit/minutes",
  title: "Thinking Bout You",
  trackType: "studio",
  explicit: true,
  trackArtist: [{ artist: "artist/ariana-grande" }],
  trackKey: "thinkingboutyou|66CXWjxzNUsdJxJ2JdwvnR|200386",
  song: "song/ariana-grande-thinking-bout-you",
  carriedBy: [
    {
      release: "release/ariana-grande-dangerous-woman",
      discNumber: 1,
      position: 15,
      externalId: "28tmK8wkE9y1UHdBKLd0nA",
      externalLink: "https://open.spotify.com/track/28tmK8wkE9y1UHdBKLd0nA",
    },
  ],
} as const satisfies Track
