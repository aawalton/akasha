import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const auroraADifferentKindOfHumanStepIiAnimal = {
  id: "01a0b637-f8c4-76ab-ac62-9c073c901e8b",
  type: "page-type/track",
  slug: "aurora-a-different-kind-of-human-step-ii-animal",
  ownLength: 3.59,
  ownProgress: 0,
  partOfCollections: ["release/aurora-a-different-kind-of-human-step-ii"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0YL8f5tV78ZyflRWwEisXt",
      externalLink: "https://open.spotify.com/track/0YL8f5tV78ZyflRWwEisXt",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Animal",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "1WgXqy2Dd70QQOU7Ay074N", artistName: "AURORA" }],
  trackKey: "animal|1WgXqy2Dd70QQOU7Ay074N|215400",
  song: "song/aurora-animal",
} as const satisfies Track
