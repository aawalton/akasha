import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeDangerousWomanSometimes = {
  id: "01a0a6c5-2c5e-7479-a055-aec96131a299",
  type: "page-type/track",
  slug: "ariana-grande-dangerous-woman-sometimes",
  ownLength: 3.7777666666666665,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-dangerous-woman"],
  position: 10,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7IqSduDsieo2epoqA97NxC",
      externalLink: "https://open.spotify.com/track/7IqSduDsieo2epoqA97NxC",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Sometimes",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" }],
  trackKey: "sometimes|66CXWjxzNUsdJxJ2JdwvnR|226666",
  song: "song/ariana-grande-sometimes",
} as const satisfies Track
