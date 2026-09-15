import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeFocusFocus = {
  id: "01a0a6c5-3acb-7265-bd31-afa0c81fff11",
  type: "page-type/track",
  slug: "ariana-grande-focus-focus",
  ownLength: 3.522666666666667,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-focus"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1cdzfFjEbUbgTm5nv3FgXR",
      externalLink: "https://open.spotify.com/track/1cdzfFjEbUbgTm5nv3FgXR",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Focus",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" }],
  trackKey: "focus|66CXWjxzNUsdJxJ2JdwvnR|211360",
} as const satisfies Track
