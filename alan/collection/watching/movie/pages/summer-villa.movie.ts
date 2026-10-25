import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const summerVilla = {
  id: "01a17499-a7d7-7b99-bd8a-4a13e42e37f2",
  type: "page-type/movie",
  slug: "summer-villa",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2016-07-23",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "407172",
      externalLink: "https://www.themoviedb.org/movie/407172",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Summer Villa",
  genres: ["Romance", "Comedy", "TV Movie"],
  imdbId: "tt5922484",
  posterPath: "/npiWf0kTKOHyQoPnmL7HOfbNAhL.jpg",
  voteAverage: 6.403,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:29.458Z",
  updatedAt: "2026-10-25T19:46:29.458Z",
} as const satisfies Movie
