import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const auroraStormStorm = {
  id: "01a0b638-0358-76e1-989c-cf9b535832d9",
  type: "page-type/track",
  slug: "aurora-storm-storm",
  ownLength: 3.7948,
  ownProgress: 0,
  partOfCollections: ["release/aurora-storm"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7AsYl5LgI6yHEGNnXZYQO4",
      externalLink: "https://open.spotify.com/track/7AsYl5LgI6yHEGNnXZYQO4",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Storm",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "5a5vu4RzsAHdKN0aYyblZ8", artistName: "吳青峰" },
    { externalId: "1WgXqy2Dd70QQOU7Ay074N", artistName: "AURORA" },
  ],
  trackKey: "storm|1WgXqy2Dd70QQOU7Ay074N,5a5vu4RzsAHdKN0aYyblZ8|227688",
} as const satisfies Track
