import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const theBirthdayWish = {
  id: "01a17499-a7d8-755e-b4ce-79792487f268",
  type: "page-type/movie",
  slug: "the-birthday-wish",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2017-01-21",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "435117",
      externalLink: "https://www.themoviedb.org/movie/435117",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "The Birthday Wish",
  genres: ["TV Movie", "Romance"],
  imdbId: "tt6432062",
  posterPath: "/b9gK5vq7ByP76dYUC5xeCa7jWCo.jpg",
  voteAverage: 6,
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
