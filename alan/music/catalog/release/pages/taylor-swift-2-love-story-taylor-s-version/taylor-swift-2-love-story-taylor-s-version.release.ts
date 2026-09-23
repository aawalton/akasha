import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const taylorSwift2LoveStoryTaylorSVersion = {
  id: "01a0676a-d724-7002-85ab-c9a017545411",
  type: "page-type/release",
  slug: "taylor-swift-2-love-story-taylor-s-version",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/taylor-swift"],
  position: 0,
  publishedAt: "2021-02-12",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4j2syEjl3h1To8KbRgvmJn",
      externalLink: "https://open.spotify.com/album/4j2syEjl3h1To8KbRgvmJn",
    },
  ],
  title: "Love Story (Taylor’s Version)",
} as const satisfies Release
