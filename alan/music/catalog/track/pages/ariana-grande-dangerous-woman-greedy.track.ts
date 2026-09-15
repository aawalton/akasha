import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeDangerousWomanGreedy = {
  id: "01a0a6c5-2bfc-711e-8780-a4ac42661549",
  type: "page-type/track",
  slug: "ariana-grande-dangerous-woman-greedy",
  ownLength: 3.5813333333333333,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-dangerous-woman"],
  position: 7,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6tcLyhPrmBEPaQ1Yz4MdGy",
      externalLink: "https://open.spotify.com/track/6tcLyhPrmBEPaQ1Yz4MdGy",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Greedy",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" }],
  trackKey: "greedy|66CXWjxzNUsdJxJ2JdwvnR|214880",
} as const satisfies Track
