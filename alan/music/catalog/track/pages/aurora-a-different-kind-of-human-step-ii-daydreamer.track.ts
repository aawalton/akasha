import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const auroraADifferentKindOfHumanStepIiDaydreamer = {
  id: "01a0b637-f912-7811-9535-6e4cf7cfd68b",
  type: "page-type/track",
  slug: "aurora-a-different-kind-of-human-step-ii-daydreamer",
  ownLength: 3.65095,
  ownProgress: 0,
  partOfCollections: ["release/aurora-a-different-kind-of-human-step-ii"],
  position: 4,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6zHEWX6PuCQIRy4rdh777J",
      externalLink: "https://open.spotify.com/track/6zHEWX6PuCQIRy4rdh777J",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Daydreamer",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "1WgXqy2Dd70QQOU7Ay074N", artistName: "AURORA" }],
  trackKey: "daydreamer|1WgXqy2Dd70QQOU7Ay074N|219057",
  song: "song/aurora-daydreamer",
} as const satisfies Track
