import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeMyEverythingTenthAnniversaryEditionIntro = {
  id: "01a0a6c5-1621-7b69-a36a-4ab4a5ea26b6",
  type: "page-type/track",
  slug: "ariana-grande-my-everything-tenth-anniversary-edition-intro",
  ownLength: 1.3294333333333332,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-my-everything-tenth-anniversary-edition"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1djLdPkMQCbF1iENkeqXJG",
      externalLink: "https://open.spotify.com/track/1djLdPkMQCbF1iENkeqXJG",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Intro",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" }],
  trackKey: "intro|66CXWjxzNUsdJxJ2JdwvnR|79766",
  song: "song/ariana-grande-intro",
} as const satisfies Track
