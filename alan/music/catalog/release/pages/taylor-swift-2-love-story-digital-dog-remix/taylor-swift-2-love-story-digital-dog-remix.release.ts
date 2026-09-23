import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const taylorSwift2LoveStoryDigitalDogRemix = {
  id: "01a0676a-d724-7000-84cd-5a34f8d5f2ce",
  type: "page-type/release",
  slug: "taylor-swift-2-love-story-digital-dog-remix",
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
      externalId: "2Z2KdJE0nGGu0qdWA45mza",
      externalLink: "https://open.spotify.com/album/2Z2KdJE0nGGu0qdWA45mza",
    },
  ],
  title: "Love Story (Digital Dog Remix)",
} as const satisfies Release
