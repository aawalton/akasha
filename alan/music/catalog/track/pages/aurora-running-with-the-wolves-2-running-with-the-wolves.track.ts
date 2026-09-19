import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const auroraRunningWithTheWolves2RunningWithTheWolves = {
  id: "01a0b638-1203-738a-9c90-bd2af7a38d4c",
  type: "page-type/track",
  slug: "aurora-running-with-the-wolves-2-running-with-the-wolves",
  ownLength: 3.246,
  ownProgress: 0,
  partOfCollections: ["release/aurora-running-with-the-wolves-2"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3QhtBQhjw2J1dMIQLCFBrC",
      externalLink: "https://open.spotify.com/track/3QhtBQhjw2J1dMIQLCFBrC",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Running with the Wolves",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "1WgXqy2Dd70QQOU7Ay074N", artistName: "AURORA" }],
  trackKey: "runningwiththewolves|1WgXqy2Dd70QQOU7Ay074N|194760",
  song: "song/aurora-running-with-the-wolves",
} as const satisfies Track
