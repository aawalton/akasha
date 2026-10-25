import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const theAngelTree = {
  id: "01a1749a-259d-7ae3-be42-f44db817c1e4",
  type: "page-type/movie",
  slug: "the-angel-tree",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2020-11-21",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "746466",
      externalLink: "https://www.themoviedb.org/movie/746466",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "The Angel Tree",
  genres: ["Mystery", "TV Movie", "Romance"],
  imdbId: "tt11348926",
  posterPath: "/3ykv13npXiwTQiMv3Qf2VXIOdPW.jpg",
  voteAverage: 6.5,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:01.655Z",
  updatedAt: "2026-10-25T19:47:01.655Z",
} as const satisfies Movie
