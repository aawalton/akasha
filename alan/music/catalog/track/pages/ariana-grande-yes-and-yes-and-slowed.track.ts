import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeYesAndYesAndSlowed = {
  id: "01a0a6c5-350b-7c4d-8c9c-9eeedb7ebfed",
  type: "page-type/track",
  slug: "ariana-grande-yes-and-yes-and-slowed",
  ownLength: 4.021616666666667,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-yes-and"],
  position: 6,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0WUfD4IZdOgo85xz3YX3oh",
      externalLink: "https://open.spotify.com/track/0WUfD4IZdOgo85xz3YX3oh",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "yes, and? - slowed",
  discNumber: 1,
  explicit: true,
  trackArtist: [{ externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" }],
  trackKey: "yesandslowed|66CXWjxzNUsdJxJ2JdwvnR|241297",
  song: "song/ariana-grande-yes-and-2",
} as const satisfies Track
