import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeLoveMeHarderLoveMeHarderInstrumental = {
  id: "01a0a6c5-3c6b-7027-a4ec-d2a9317c05a1",
  type: "page-type/track",
  slug: "ariana-grande-love-me-harder-love-me-harder-instrumental",
  ownLength: 3.9339,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-love-me-harder"],
  position: 3,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5Lrma6e2xfpi8uGBknkQIt",
      externalLink: "https://open.spotify.com/track/5Lrma6e2xfpi8uGBknkQIt",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Love Me Harder - Instrumental",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" }],
  trackKey: "lovemeharderinstrumental|66CXWjxzNUsdJxJ2JdwvnR|236034",
} as const satisfies Track
