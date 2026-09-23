import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const taylorSwift2LoveStoryPopMix = {
  id: "01a0676a-d724-7001-921c-6207b45be06c",
  type: "page-type/release",
  slug: "taylor-swift-2-love-story-pop-mix",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/taylor-swift"],
  position: 0,
  publishedAt: "2020-02-07",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1iab5rfjNpGhoPlFzPyp4k",
      externalLink: "https://open.spotify.com/album/1iab5rfjNpGhoPlFzPyp4k",
    },
  ],
  title: "Love Story (Pop Mix)",
} as const satisfies Release
