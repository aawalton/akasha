import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeWickedTheSoundtrackCommentaryPopular = {
  id: "01a0a6c5-4a72-7539-a488-0ec4086ec2f2",
  type: "page-type/track",
  slug: "ariana-grande-wicked-the-soundtrack-commentary-popular",
  ownLength: 4.025016666666667,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-wicked-the-soundtrack-commentary"],
  position: 15,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4S4ZAEjGoXPgVZQQ7kaErC",
      externalLink: "https://open.spotify.com/track/4S4ZAEjGoXPgVZQQ7kaErC",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Popular",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" }],
  trackKey: "popular|66CXWjxzNUsdJxJ2JdwvnR|241501",
  song: "song/ariana-grande-popular",
} as const satisfies Track
