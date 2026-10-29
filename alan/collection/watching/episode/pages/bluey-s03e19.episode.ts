import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const blueyS03e19 = {
  id: "01a18843-d154-780c-a621-89c01f859d67",
  type: "page-type/episode",
  slug: "bluey-s03e19",
  description:
    "Bluey and Bingo are making mud pizzas and delivering them to the grownups, but their pedal car's wheel keeps falling off!",
  ownLength: 7,
  ownProgress: 0,
  partOfCollections: ["season/bluey-season-3"],
  position: 19,
  publishedAt: "2021-12-09",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "3381138",
      externalLink: "https://www.themoviedb.org/tv/82728/season/3/episode/19",
    },
  ],
  title: "Pizza Girls",
  episodeType: "standard",
  stillPath: "/6hccFN4DfDD4ANhEjjyc27hWH3m.jpg",
  voteAverage: 7.3,
  createdAt: "2026-10-29T15:25:08.300Z",
  updatedAt: "2026-10-29T15:25:08.300Z",
} as const satisfies Episode
