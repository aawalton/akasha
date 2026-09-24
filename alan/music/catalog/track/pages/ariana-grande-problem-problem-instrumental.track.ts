import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeProblemProblemInstrumental = {
  id: "01a0a6c5-3de1-7349-9a0c-7ad7cf92cf02",
  type: "page-type/track",
  slug: "ariana-grande-problem-problem-instrumental",
  ownLength: 3.2228166666666667,
  ownProgress: 3.2228166666666667,
  partOfCollections: ["release/ariana-grande-problem"],
  status: "completed",
  unit: "unit/minutes",
  title: "Problem - Instrumental",
  trackType: "instrumental",
  explicit: false,
  trackArtist: [{ artist: "artist/ariana-grande" }],
  trackKey: "probleminstrumental|66CXWjxzNUsdJxJ2JdwvnR|193369",
  song: "song/ariana-grande-problem",
  carriedBy: [
    {
      release: "release/ariana-grande-problem",
      discNumber: 1,
      position: 3,
      externalId: "2D7Rl4LQ9oeI3Ah4aKctGK",
      externalLink: "https://open.spotify.com/track/2D7Rl4LQ9oeI3Ah4aKctGK",
    },
  ],
} as const satisfies Track
