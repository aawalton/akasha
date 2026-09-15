import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeChristmasChillDecember = {
  id: "01a0a6c5-3a27-744f-bfa0-94e89967313a",
  type: "page-type/track",
  slug: "ariana-grande-christmas-chill-december",
  ownLength: 1.9376833333333334,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-christmas-chill"],
  position: 3,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6nx2z3uGS0LhvRor8LpoIb",
      externalLink: "https://open.spotify.com/track/6nx2z3uGS0LhvRor8LpoIb",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "December",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" }],
  trackKey: "december|66CXWjxzNUsdJxJ2JdwvnR|116261",
} as const satisfies Track
