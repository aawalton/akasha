import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeYoursTrulyHoneymoonAvenue = {
  id: "01a0a6c5-2f66-7193-a6c5-f5beccc0aca6",
  type: "page-type/track",
  slug: "ariana-grande-yours-truly-honeymoon-avenue",
  ownLength: 5.662216666666667,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-yours-truly"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2ofOe2OaXFpZF5ETbsc7Qu",
      externalLink: "https://open.spotify.com/track/2ofOe2OaXFpZF5ETbsc7Qu",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Honeymoon Avenue",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" }],
  trackKey: "honeymoonavenue|66CXWjxzNUsdJxJ2JdwvnR|339733",
  song: "song/ariana-grande-honeymoon-avenue",
} as const satisfies Track
