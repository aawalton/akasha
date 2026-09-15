import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeWickedTheSoundtrackPopular = {
  id: "01a0a6c5-4ca7-7db3-8b2d-49da2eaf0ac7",
  type: "page-type/track",
  slug: "ariana-grande-wicked-the-soundtrack-popular",
  ownLength: 4.025016666666667,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-wicked-the-soundtrack"],
  position: 7,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6HBDWNi7R2OEw4hNkXQbXe",
      externalLink: "https://open.spotify.com/track/6HBDWNi7R2OEw4hNkXQbXe",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Popular",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" }],
  trackKey: "popular|66CXWjxzNUsdJxJ2JdwvnR|241501",
} as const satisfies Track
