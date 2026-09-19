import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeWickedForGoodTheSoundtrackTheGirlInTheBubble = {
  id: "01a0a6c5-0ea5-7606-9b0f-6e6aa468c266",
  type: "page-type/track",
  slug: "ariana-grande-wicked-for-good-the-soundtrack-the-girl-in-the-bubble",
  ownLength: 3.675,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-wicked-for-good-the-soundtrack"],
  position: 10,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6Wxn79EwKPQvYerlctheGx",
      externalLink: "https://open.spotify.com/track/6Wxn79EwKPQvYerlctheGx",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "The Girl in the Bubble",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" }],
  trackKey: "thegirlinthebubble|66CXWjxzNUsdJxJ2JdwvnR|220500",
  song: "song/ariana-grande-the-girl-in-the-bubble",
} as const satisfies Track
