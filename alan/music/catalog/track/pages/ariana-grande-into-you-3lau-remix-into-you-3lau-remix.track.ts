import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeIntoYou3lauRemixIntoYou3lauRemix = {
  id: "01a0a6c5-3951-74d1-b51d-f8b3392db27a",
  type: "page-type/track",
  slug: "ariana-grande-into-you-3lau-remix-into-you-3lau-remix",
  ownLength: 3.2857666666666665,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-into-you-3lau-remix"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1cfVkL84XmRON3Gl9jDXKI",
      externalLink: "https://open.spotify.com/track/1cfVkL84XmRON3Gl9jDXKI",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Into You - 3LAU Remix",
  trackType: "remix",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" },
    { externalId: "4YLQaW1UU3mrVetC8gNkg5", artistName: "3LAU" },
  ],
  trackKey: "intoyou3lauremix|4YLQaW1UU3mrVetC8gNkg5,66CXWjxzNUsdJxJ2JdwvnR|197146",
  song: "song/ariana-grande-into-you",
} as const satisfies Track
