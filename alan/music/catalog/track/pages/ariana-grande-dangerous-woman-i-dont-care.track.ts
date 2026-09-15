import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeDangerousWomanIDontCare = {
  id: "01a0a6c5-2c7d-71e4-8b58-5e504a329b30",
  type: "page-type/track",
  slug: "ariana-grande-dangerous-woman-i-dont-care",
  ownLength: 2.9671,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-dangerous-woman"],
  position: 11,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7xagQoIf776ukUlgH4TyyB",
      externalLink: "https://open.spotify.com/track/7xagQoIf776ukUlgH4TyyB",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "I Don't Care",
  discNumber: 1,
  explicit: true,
  trackArtist: [{ externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" }],
  trackKey: "idontcare|66CXWjxzNUsdJxJ2JdwvnR|178026",
} as const satisfies Track
