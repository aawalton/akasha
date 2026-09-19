import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeMyEverythingTenthAnniversaryEditionHandsOnMe = {
  id: "01a0a6c5-177a-7832-a3a5-9d50991b31e0",
  type: "page-type/track",
  slug: "ariana-grande-my-everything-tenth-anniversary-edition-hands-on-me",
  ownLength: 3.2035666666666667,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-my-everything-tenth-anniversary-edition"],
  position: 11,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "09FrbOhB1v2VV5MxJd54qm",
      externalLink: "https://open.spotify.com/track/09FrbOhB1v2VV5MxJd54qm",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Hands On Me",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" },
    { externalId: "5dHt1vcEm9qb8fCyLcB3HL", artistName: "A$AP Ferg" },
  ],
  trackKey: "handsonme|5dHt1vcEm9qb8fCyLcB3HL,66CXWjxzNUsdJxJ2JdwvnR|192214",
  song: "song/ariana-grande-hands-on-me",
} as const satisfies Track
