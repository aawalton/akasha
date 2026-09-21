import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeFocusFocus = {
  id: "01a0a6c5-3acb-7265-bd31-afa0c81fff11",
  type: "page-type/track",
  slug: "ariana-grande-focus-focus",
  ownLength: 3.522666666666667,
  ownProgress: 3.522666666666667,
  partOfCollections: ["release/ariana-grande-focus"],
  status: "completed",
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
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" }],
  trackKey: "focus|66CXWjxzNUsdJxJ2JdwvnR|211360",
  song: "song/ariana-grande-focus",
  carriedBy: [
    {
      release: "release/ariana-grande-focus",
      discNumber: 1,
      position: 1,
      externalId: "1cdzfFjEbUbgTm5nv3FgXR",
      externalLink: "https://open.spotify.com/track/1cdzfFjEbUbgTm5nv3FgXR",
    },
  ],
} as const satisfies Track
