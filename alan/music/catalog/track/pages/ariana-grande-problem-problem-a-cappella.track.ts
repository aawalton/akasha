import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeProblemProblemACappella = {
  id: "01a0a6c5-3dbe-726a-8fa9-4b5f51c2254e",
  type: "page-type/track",
  slug: "ariana-grande-problem-problem-a-cappella",
  ownLength: 3.191133333333333,
  ownProgress: 3.191133333333333,
  partOfCollections: ["release/ariana-grande-problem"],
  status: "completed",
  unit: "unit/minutes",
  title: "Problem - A Cappella",
  trackType: "a-cappella",
  explicit: false,
  trackArtist: [{ artist: "artist/ariana-grande" }, { artistName: "Iggy Azalea" }],
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
