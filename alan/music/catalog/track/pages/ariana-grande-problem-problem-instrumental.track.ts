import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeProblemProblemInstrumental = {
  id: "01a0a6c5-3de1-7349-9a0c-7ad7cf92cf02",
  type: "page-type/track",
  slug: "ariana-grande-problem-problem-instrumental",
  ownLength: 3.2228166666666667,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-problem"],
  position: 3,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2D7Rl4LQ9oeI3Ah4aKctGK",
      externalLink: "https://open.spotify.com/track/2D7Rl4LQ9oeI3Ah4aKctGK",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Problem - Instrumental",
  trackType: "instrumental",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" }],
  trackKey: "probleminstrumental|66CXWjxzNUsdJxJ2JdwvnR|193369",
  song: "song/ariana-grande-problem",
} as const satisfies Track
