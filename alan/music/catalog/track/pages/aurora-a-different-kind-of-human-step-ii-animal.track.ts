import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const auroraADifferentKindOfHumanStepIiAnimal = {
  id: "01a0b637-f8c4-76ab-ac62-9c073c901e8b",
  type: "page-type/track",
  slug: "aurora-a-different-kind-of-human-step-ii-animal",
  ownLength: 3.59,
  ownProgress: 3.59,
  partOfCollections: ["release/aurora-a-different-kind-of-human-step-ii"],
  status: "completed",
  unit: "unit/minutes",
  title: "Animal",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/aurora" }],
  trackKey: "animal|1WgXqy2Dd70QQOU7Ay074N|215400",
  song: "song/aurora-animal",
  carriedBy: [
    {
      release: "release/aurora-a-different-kind-of-human-step-ii",
      discNumber: 1,
      position: 2,
      externalId: "0YL8f5tV78ZyflRWwEisXt",
      externalLink: "https://open.spotify.com/track/0YL8f5tV78ZyflRWwEisXt",
    },
  ],
} as const satisfies Track
