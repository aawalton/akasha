import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeDangerousWomanTenthAnniversaryEditionIntoYou = {
  id: "01a0a6c5-05da-7042-9769-a07d209f07dc",
  type: "page-type/track",
  slug: "ariana-grande-dangerous-woman-tenth-anniversary-edition-into-you",
  ownLength: 4.074066666666667,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-dangerous-woman-tenth-anniversary-edition"],
  position: 4,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4Bsd7hSLYvqaZFRyaWiw1E",
      externalLink: "https://open.spotify.com/track/4Bsd7hSLYvqaZFRyaWiw1E",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Into You",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" }],
  trackKey: "intoyou|66CXWjxzNUsdJxJ2JdwvnR|244444",
  song: "song/ariana-grande-into-you",
} as const satisfies Track
