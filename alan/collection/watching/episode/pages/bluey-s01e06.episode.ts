import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const blueyS01e06 = {
  id: "01a18843-d14c-7274-9777-ddcc745b7ca8",
  type: "page-type/episode",
  slug: "bluey-s01e06",
  description:
    "At the weekend, Bluey and Bingo are playing in the garden with Dad. But Bingo gets upset, when she discovers a walking leaf insect and Dad is too caught up in the game to notice.",
  ownLength: 7,
  ownProgress: 0,
  partOfCollections: ["season/bluey-season-1"],
  position: 6,
  publishedAt: "2018-10-06",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1593872",
      externalLink: "https://www.themoviedb.org/tv/82728/season/1/episode/6",
    },
  ],
  title: "The Weekend",
  episodeType: "standard",
  stillPath: "/yFCjrfxQLeWaoN3XcUYGnnml3pA.jpg",
  voteAverage: 6.9,
  createdAt: "2026-10-29T15:25:08.300Z",
  updatedAt: "2026-10-29T15:25:08.300Z",
} as const satisfies Episode
