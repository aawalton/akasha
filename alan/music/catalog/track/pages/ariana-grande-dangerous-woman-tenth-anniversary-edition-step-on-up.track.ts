import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeDangerousWomanTenthAnniversaryEditionStepOnUp = {
  id: "01a0a6c5-076b-72cf-a72d-6dd4279f0372",
  type: "page-type/track",
  slug: "ariana-grande-dangerous-woman-tenth-anniversary-edition-step-on-up",
  ownLength: 3.014283333333333,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-dangerous-woman-tenth-anniversary-edition"],
  position: 16,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4oR18wubZXPJ0KAGswv1mx",
      externalLink: "https://open.spotify.com/track/4oR18wubZXPJ0KAGswv1mx",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Step On Up",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" }],
  trackKey: "steponup|66CXWjxzNUsdJxJ2JdwvnR|180857",
  song: "song/ariana-grande-step-on-up",
} as const satisfies Track
