import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const auroraRunningWithTheWolvesLittleBoyInTheGrass = {
  id: "01a0b638-11da-7ede-a33d-87b3b6204e3b",
  type: "page-type/track",
  slug: "aurora-running-with-the-wolves-little-boy-in-the-grass",
  ownLength: 4.274666666666667,
  ownProgress: 0,
  partOfCollections: ["release/aurora-running-with-the-wolves"],
  position: 4,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2eOPAKk6XUELsl3FSgRmh7",
      externalLink: "https://open.spotify.com/track/2eOPAKk6XUELsl3FSgRmh7",
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
