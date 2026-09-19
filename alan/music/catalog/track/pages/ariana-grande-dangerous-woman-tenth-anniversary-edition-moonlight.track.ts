import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeDangerousWomanTenthAnniversaryEditionMoonlight = {
  id: "01a0a6c5-0586-780a-82bb-700642928bfc",
  type: "page-type/track",
  slug: "ariana-grande-dangerous-woman-tenth-anniversary-edition-moonlight",
  ownLength: 3.3727666666666667,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-dangerous-woman-tenth-anniversary-edition"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6S8lgW6nwrK75tddTLH7mX",
      externalLink: "https://open.spotify.com/track/6S8lgW6nwrK75tddTLH7mX",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Moonlight",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" }],
  trackKey: "moonlight|66CXWjxzNUsdJxJ2JdwvnR|202366",
  song: "song/ariana-grande-moonlight",
} as const satisfies Track
