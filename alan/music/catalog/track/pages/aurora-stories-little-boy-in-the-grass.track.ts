import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const auroraStoriesLittleBoyInTheGrass = {
  id: "01a0b638-07df-782d-bc20-13b39978aa4f",
  type: "page-type/track",
  slug: "aurora-stories-little-boy-in-the-grass",
  ownLength: 4.274666666666667,
  ownProgress: 0,
  partOfCollections: ["release/aurora-stories"],
  position: 4,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2Mdcz3aLXRdPQAe92o6dcN",
      externalLink: "https://open.spotify.com/track/2Mdcz3aLXRdPQAe92o6dcN",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Little Boy in the Grass",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "1WgXqy2Dd70QQOU7Ay074N", artistName: "AURORA" }],
  trackKey: "littleboyinthegrass|1WgXqy2Dd70QQOU7Ay074N|256480",
  song: "song/aurora-little-boy-in-the-grass",
} as const satisfies Track
