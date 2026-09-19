import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeWickedTheSoundtrackPopularEdit = {
  id: "01a0a6c5-4d69-7791-bd0b-b229dd29eb34",
  type: "page-type/track",
  slug: "ariana-grande-wicked-the-soundtrack-popular-edit",
  ownLength: 2.8985833333333333,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-wicked-the-soundtrack"],
  position: 13,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5othwA5v4eG9PAF2GdGazz",
      externalLink: "https://open.spotify.com/track/5othwA5v4eG9PAF2GdGazz",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Popular - Edit",
  trackType: "version",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" }],
  trackKey: "popularedit|66CXWjxzNUsdJxJ2JdwvnR|173915",
  song: "song/ariana-grande-popular",
} as const satisfies Track
