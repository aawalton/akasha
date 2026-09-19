import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandePetalPetal = {
  id: "01a0a6c5-0426-76fa-842b-0a414378c47c",
  type: "page-type/track",
  slug: "ariana-grande-petal-petal",
  ownLength: 3.0708,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-petal"],
  position: 3,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "70pVCVMGjmIWPbWXDwf11e",
      externalLink: "https://open.spotify.com/track/70pVCVMGjmIWPbWXDwf11e",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "petal",
  trackType: "studio",
  discNumber: 1,
  explicit: true,
  trackArtist: [{ externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" }],
  trackKey: "petal|66CXWjxzNUsdJxJ2JdwvnR|184248",
  song: "song/ariana-grande-petal",
} as const satisfies Track
