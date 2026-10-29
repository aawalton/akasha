import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const theChickenSistersSeason1 = {
  id: "01a18856-798f-7f6a-9e4e-fec0a1d7ba2c",
  type: "page-type/season",
  slug: "the-chicken-sisters-season-1",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show/the-chicken-sisters"],
  position: 1,
  publishedAt: "2024-09-10",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "394856",
      externalLink: "https://www.themoviedb.org/tv/254988/season/1",
    },
  ],
  title: "The Chicken Sisters Season 1",
  posterPath: "/eNFVyxZeb69HkMmCtl6Oh5A3eNe.jpg",
  voteAverage: 0,
  createdAt: "2026-10-29T15:45:31.022Z",
  updatedAt: "2026-10-29T15:45:31.022Z",
} as const satisfies Season
