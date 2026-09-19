import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const auroraADifferentKindOfHumanStepIiInBottles = {
  id: "01a0b637-f986-7521-89ef-825c15294536",
  type: "page-type/track",
  slug: "aurora-a-different-kind-of-human-step-ii-in-bottles",
  ownLength: 3.969533333333333,
  ownProgress: 0,
  partOfCollections: ["release/aurora-a-different-kind-of-human-step-ii"],
  position: 7,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "77jfTk3x403OSSMBq2tSgN",
      externalLink: "https://open.spotify.com/track/77jfTk3x403OSSMBq2tSgN",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "In Bottles",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "1WgXqy2Dd70QQOU7Ay074N", artistName: "AURORA" }],
  trackKey: "inbottles|1WgXqy2Dd70QQOU7Ay074N|238172",
  song: "song/aurora-in-bottles",
} as const satisfies Track
