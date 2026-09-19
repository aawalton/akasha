import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeYesAndYesAndEdit = {
  id: "01a0a6c5-348e-735b-930c-56271e410399",
  type: "page-type/track",
  slug: "ariana-grande-yes-and-yes-and-edit",
  ownLength: 3.1792333333333334,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-yes-and"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5wiAFvYjgrzxlyYxDXP155",
      externalLink: "https://open.spotify.com/track/5wiAFvYjgrzxlyYxDXP155",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "yes, and? - edit",
  discNumber: 1,
  explicit: true,
  trackArtist: [{ externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" }],
  trackKey: "yesandedit|66CXWjxzNUsdJxJ2JdwvnR|190754",
  song: "song/ariana-grande-yes-and-2",
} as const satisfies Track
