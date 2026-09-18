import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const auroraRunningWithTheWolvesRunningWithTheWolves = {
  id: "01a0b638-1189-7d46-bf32-3714613ce73f",
  type: "page-type/track",
  slug: "aurora-running-with-the-wolves-running-with-the-wolves",
  ownLength: 3.246,
  ownProgress: 0,
  partOfCollections: ["release/aurora-running-with-the-wolves"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0HuV6zFVx1cGQ9P7H2wnNS",
      externalLink: "https://open.spotify.com/track/0HuV6zFVx1cGQ9P7H2wnNS",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Running with the Wolves",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "1WgXqy2Dd70QQOU7Ay074N", artistName: "AURORA" }],
  trackKey: "runningwiththewolves|1WgXqy2Dd70QQOU7Ay074N|194760",
} as const satisfies Track
