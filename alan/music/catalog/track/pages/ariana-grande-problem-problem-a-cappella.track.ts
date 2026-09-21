import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeProblemProblemACappella = {
  id: "01a0a6c5-3dbe-726a-8fa9-4b5f51c2254e",
  type: "page-type/track",
  slug: "ariana-grande-problem-problem-a-cappella",
  ownLength: 3.191133333333333,
  ownProgress: 3.191133333333333,
  partOfCollections: ["release/ariana-grande-problem"],
  position: 2,
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4rKmu5d1xtcGDKktcq2E7c",
      externalLink: "https://open.spotify.com/track/4rKmu5d1xtcGDKktcq2E7c",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Problem - A Cappella",
  trackType: "a-cappella",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" },
    { externalId: "5yG7ZAZafVaAlMTeBybKAL", artistName: "Iggy Azalea" },
  ],
  trackKey: "problemacappella|5yG7ZAZafVaAlMTeBybKAL,66CXWjxzNUsdJxJ2JdwvnR|191468",
  song: "song/ariana-grande-problem",
  carriedBy: [
    {
      release: "release/ariana-grande-problem",
      discNumber: 1,
      position: 2,
      externalId: "4rKmu5d1xtcGDKktcq2E7c",
      externalLink: "https://open.spotify.com/track/4rKmu5d1xtcGDKktcq2E7c",
    },
  ],
} as const satisfies Track
