import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeDangerousWomanBeAlright = {
  id: "01a0a6c5-2b5c-7e71-a5f2-b695f03b5a0c",
  type: "page-type/track",
  slug: "ariana-grande-dangerous-woman-be-alright",
  ownLength: 2.9882166666666667,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-dangerous-woman"],
  position: 3,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1MkFj1ThZZxjYMNkczx9mk",
      externalLink: "https://open.spotify.com/track/1MkFj1ThZZxjYMNkczx9mk",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Be Alright",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" }],
  trackKey: "bealright|66CXWjxzNUsdJxJ2JdwvnR|179293",
  song: "song/ariana-grande-be-alright",
} as const satisfies Track
