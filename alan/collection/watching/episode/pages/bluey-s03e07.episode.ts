import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const blueyS03e07 = {
  id: "01a18843-d153-7e83-be62-cd82495d1c6e",
  type: "page-type/episode",
  slug: "bluey-s03e07",
  description:
    "When Dad complains about how dissimilar Bluey and Bingo are, Bluey hatches a plan to make them more alike and happily introduces Mini Bluey!",
  ownLength: 7,
  ownProgress: 0,
  partOfCollections: ["season/bluey-season-3"],
  position: 7,
  publishedAt: "2021-11-27",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "3350928",
      externalLink: "https://www.themoviedb.org/tv/82728/season/3/episode/7",
    },
  ],
  title: "Mini Bluey",
  episodeType: "standard",
  stillPath: "/hHlV3O7NsllqZlB06ANNP62fcsl.jpg",
  voteAverage: 6.2,
  createdAt: "2026-10-29T15:25:08.300Z",
  updatedAt: "2026-10-29T15:25:08.300Z",
} as const satisfies Episode
