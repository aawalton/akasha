import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeDangerousWomanTenthAnniversaryEditionSometimes = {
  id: "01a0a6c5-069c-720e-b91c-42e5b75f041d",
  type: "page-type/track",
  slug: "ariana-grande-dangerous-woman-tenth-anniversary-edition-sometimes",
  ownLength: 3.7777666666666665,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-dangerous-woman-tenth-anniversary-edition"],
  position: 10,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3a1mMCctccHQQH52l15nmJ",
      externalLink: "https://open.spotify.com/track/3a1mMCctccHQQH52l15nmJ",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Sometimes",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" }],
  trackKey: "sometimes|66CXWjxzNUsdJxJ2JdwvnR|226666",
  song: "song/ariana-grande-sometimes",
} as const satisfies Track
