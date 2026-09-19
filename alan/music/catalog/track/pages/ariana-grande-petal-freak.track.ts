import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandePetalFreak = {
  id: "01a0a6c5-04ac-7312-b521-f786f22de95c",
  type: "page-type/track",
  slug: "ariana-grande-petal-freak",
  ownLength: 3.33015,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-petal"],
  position: 7,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6QhsCYcFdfyMbPWCiViI8K",
      externalLink: "https://open.spotify.com/track/6QhsCYcFdfyMbPWCiViI8K",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "freak",
  trackType: "studio",
  discNumber: 1,
  explicit: true,
  trackArtist: [{ externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" }],
  trackKey: "freak|66CXWjxzNUsdJxJ2JdwvnR|199809",
  song: "song/ariana-grande-freak",
} as const satisfies Track
