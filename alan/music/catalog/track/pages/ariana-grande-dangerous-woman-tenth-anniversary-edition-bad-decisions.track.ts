import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeDangerousWomanTenthAnniversaryEditionBadDecisions = {
  id: "01a0a6c5-06e3-741e-8f65-ccce0aba0097",
  type: "page-type/track",
  slug: "ariana-grande-dangerous-woman-tenth-anniversary-edition-bad-decisions",
  ownLength: 3.7736666666666667,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-dangerous-woman-tenth-anniversary-edition"],
  position: 12,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5Szw7p9ifAVy7d07JRYsW5",
      externalLink: "https://open.spotify.com/track/5Szw7p9ifAVy7d07JRYsW5",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Bad Decisions",
  discNumber: 1,
  explicit: true,
  trackArtist: [{ externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" }],
  trackKey: "baddecisions|66CXWjxzNUsdJxJ2JdwvnR|226420",
  song: "song/ariana-grande-bad-decisions",
} as const satisfies Track
