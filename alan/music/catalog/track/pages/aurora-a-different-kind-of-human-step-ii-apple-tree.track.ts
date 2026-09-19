import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const auroraADifferentKindOfHumanStepIiAppleTree = {
  id: "01a0b637-f9d0-7940-b65d-3ac7f8e732b3",
  type: "page-type/track",
  slug: "aurora-a-different-kind-of-human-step-ii-apple-tree",
  ownLength: 3.1350333333333333,
  ownProgress: 0,
  partOfCollections: ["release/aurora-a-different-kind-of-human-step-ii"],
  position: 9,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "11GFNnNtxUr6jkgY08D9WT",
      externalLink: "https://open.spotify.com/track/11GFNnNtxUr6jkgY08D9WT",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Apple Tree",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "1WgXqy2Dd70QQOU7Ay074N", artistName: "AURORA" }],
  trackKey: "appletree|1WgXqy2Dd70QQOU7Ay074N|188102",
  song: "song/aurora-apple-tree",
} as const satisfies Track
