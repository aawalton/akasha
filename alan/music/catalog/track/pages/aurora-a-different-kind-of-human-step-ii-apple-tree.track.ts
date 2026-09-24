import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const auroraADifferentKindOfHumanStepIiAppleTree = {
  id: "01a0b637-f9d0-7940-b65d-3ac7f8e732b3",
  type: "page-type/track",
  slug: "aurora-a-different-kind-of-human-step-ii-apple-tree",
  ownLength: 3.1350333333333333,
  ownProgress: 3.1350333333333333,
  partOfCollections: [
    "release/aurora-a-different-kind-of-human-step-ii",
    "release/aurora-apple-tree-georgia-remix",
    "release/aurora-for-the-metal-people",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "Apple Tree",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/aurora" }],
  trackKey: "appletree|1WgXqy2Dd70QQOU7Ay074N|188102",
  song: "song/aurora-apple-tree",
  carriedBy: [
    {
      release: "release/aurora-a-different-kind-of-human-step-ii",
      discNumber: 1,
      position: 9,
      externalId: "11GFNnNtxUr6jkgY08D9WT",
      externalLink: "https://open.spotify.com/track/11GFNnNtxUr6jkgY08D9WT",
    },
    {
      release: "release/aurora-apple-tree-georgia-remix",
      discNumber: 1,
      position: 2,
      externalId: "5iXYJKwJd3QIRbDgoWTxpy",
      externalLink: "https://open.spotify.com/track/5iXYJKwJd3QIRbDgoWTxpy",
    },
    {
      release: "release/aurora-for-the-metal-people",
      discNumber: 1,
      position: 6,
      externalId: "6zwPdwW9HepDJBBCblybMC",
      externalLink: "https://open.spotify.com/track/6zwPdwW9HepDJBBCblybMC",
    },
  ],
} as const satisfies Track
