import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const musicalTheaterWickedTheSoundtrackPopular = {
  id: "01a0a6c5-1247-7b3e-bb9a-ce48ca37ef53",
  type: "page-type/track",
  slug: "musical-theater-wicked-the-soundtrack-popular",
  ownLength: 4.025016666666667,
  ownProgress: 0,
  partOfCollections: ["release/musical-theater-wicked-the-soundtrack"],
  position: 7,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3i8fIJNV0yuC4kXT3SkVBZ",
      externalLink: "https://open.spotify.com/track/3i8fIJNV0yuC4kXT3SkVBZ",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Popular",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" }],
  trackKey: "popular|66CXWjxzNUsdJxJ2JdwvnR|241501",
} as const satisfies Track
