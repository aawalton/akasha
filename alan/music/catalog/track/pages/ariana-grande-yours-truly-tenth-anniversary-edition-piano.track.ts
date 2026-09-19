import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeYoursTrulyTenthAnniversaryEditionPiano = {
  id: "01a0a6c5-1d08-7f10-a6c4-8df0940ef4d5",
  type: "page-type/track",
  slug: "ariana-grande-yours-truly-tenth-anniversary-edition-piano",
  ownLength: 3.9071,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-yours-truly-tenth-anniversary-edition"],
  position: 6,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1WPjEBaYjOh65gQF7EwwOp",
      externalLink: "https://open.spotify.com/track/1WPjEBaYjOh65gQF7EwwOp",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Piano",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" }],
  trackKey: "piano|66CXWjxzNUsdJxJ2JdwvnR|234426",
  song: "song/ariana-grande-piano",
} as const satisfies Track
