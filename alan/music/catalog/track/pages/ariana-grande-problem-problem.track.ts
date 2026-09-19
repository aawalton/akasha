import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeProblemProblem = {
  id: "01a0a6c5-3da0-78e0-aec3-33290ece4f41",
  type: "page-type/track",
  slug: "ariana-grande-problem-problem",
  ownLength: 3.233216666666667,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-problem"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1f9MXvV39Mrx2TAEx5M2TB",
      externalLink: "https://open.spotify.com/track/1f9MXvV39Mrx2TAEx5M2TB",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Problem",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" },
    { externalId: "5yG7ZAZafVaAlMTeBybKAL", artistName: "Iggy Azalea" },
  ],
  trackKey: "problem|5yG7ZAZafVaAlMTeBybKAL,66CXWjxzNUsdJxJ2JdwvnR|193993",
  song: "song/ariana-grande-problem",
} as const satisfies Track
