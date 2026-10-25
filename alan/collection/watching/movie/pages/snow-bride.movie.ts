import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const snowBride = {
  id: "01a17499-66a1-72f0-a7ff-b3a822802c44",
  type: "page-type/movie",
  slug: "snow-bride",
  ownLength: 85,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2013-11-09",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "235662",
      externalLink: "https://www.themoviedb.org/movie/235662",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Snow Bride",
  genres: ["Romance", "Comedy", "Family", "TV Movie"],
  imdbId: "tt3214240",
  posterPath: "/QiRWSeBSY2LJxpTXfN5QeyJoLX.jpg",
  voteAverage: 6.3,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:12.764Z",
  updatedAt: "2026-10-25T19:46:12.764Z",
} as const satisfies Movie
