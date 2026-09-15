import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeYesAndYesAndSpedUp = {
  id: "01a0a6c5-34ca-76fb-b426-4d7529d25c0a",
  type: "page-type/track",
  slug: "ariana-grande-yes-and-yes-and-sped-up",
  ownLength: 3.231116666666667,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-yes-and"],
  position: 4,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0eE0ymf1EjMk1ycmFO2cfH",
      externalLink: "https://open.spotify.com/track/0eE0ymf1EjMk1ycmFO2cfH",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "yes, and? - sped up",
  discNumber: 1,
  explicit: true,
  trackArtist: [{ externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" }],
  trackKey: "yesandspedup|66CXWjxzNUsdJxJ2JdwvnR|193867",
} as const satisfies Track
