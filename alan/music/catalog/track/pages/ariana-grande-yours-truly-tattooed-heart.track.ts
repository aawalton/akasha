import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeYoursTrulyTattooedHeart = {
  id: "01a0a6c5-2fc6-7e49-9eb9-1cffda25161f",
  type: "page-type/track",
  slug: "ariana-grande-yours-truly-tattooed-heart",
  ownLength: 3.2451,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-yours-truly"],
  position: 4,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5yxghrFKJbU7pcaUFEv1Sg",
      externalLink: "https://open.spotify.com/track/5yxghrFKJbU7pcaUFEv1Sg",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Tattooed Heart",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" }],
  trackKey: "tattooedheart|66CXWjxzNUsdJxJ2JdwvnR|194706",
  song: "song/ariana-grande-tattooed-heart",
} as const satisfies Track
