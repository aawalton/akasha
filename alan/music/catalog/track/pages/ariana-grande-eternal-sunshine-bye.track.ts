import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeEternalSunshineBye = {
  id: "01a0a6c5-1add-7ce6-b34c-bf402ffa2947",
  type: "page-type/track",
  slug: "ariana-grande-eternal-sunshine-bye",
  ownLength: 2.7487833333333334,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-eternal-sunshine"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1Rweq7vNjK4kZBbGrmxQsl",
      externalLink: "https://open.spotify.com/track/1Rweq7vNjK4kZBbGrmxQsl",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "bye",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" }],
  trackKey: "bye|66CXWjxzNUsdJxJ2JdwvnR|164927",
  song: "song/ariana-grande-bye",
} as const satisfies Track
