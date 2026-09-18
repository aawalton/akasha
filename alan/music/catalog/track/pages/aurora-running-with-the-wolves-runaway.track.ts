import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const auroraRunningWithTheWolvesRunaway = {
  id: "01a0b638-1160-7a4c-b4c1-fa5f87b7180a",
  type: "page-type/track",
  slug: "aurora-running-with-the-wolves-runaway",
  ownLength: 4.1471,
  ownProgress: 0,
  partOfCollections: ["release/aurora-running-with-the-wolves"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6zxmJ2iyP8sPGVEc37w5E8",
      externalLink: "https://open.spotify.com/track/6zxmJ2iyP8sPGVEc37w5E8",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Runaway",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "1WgXqy2Dd70QQOU7Ay074N", artistName: "AURORA" }],
  trackKey: "runaway|1WgXqy2Dd70QQOU7Ay074N|248826",
} as const satisfies Track
