import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const blueyS01e11 = {
  id: "01a18843-d14d-7bf9-aea2-d2f097646052",
  type: "page-type/episode",
  slug: "bluey-s01e11",
  description:
    "At the park, Bluey is struggling to learn how to ride her bike. But as she and Dad watch her friends determination with their own tasks, Bluey is inspired to give it another try.",
  ownLength: 7,
  ownProgress: 0,
  partOfCollections: ["season/bluey-season-1"],
  position: 11,
  publishedAt: "2018-10-11",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1593885",
      externalLink: "https://www.themoviedb.org/tv/82728/season/1/episode/11",
    },
  ],
  title: "Bike",
  episodeType: "standard",
  stillPath: "/aOPQxhssWj8H7YFbQVDlZqKVhfx.jpg",
  voteAverage: 8.8,
  createdAt: "2026-10-29T15:25:08.300Z",
  updatedAt: "2026-10-29T15:25:08.300Z",
} as const satisfies Episode
