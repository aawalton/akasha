import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const walkingTheDog = {
  id: "01a17499-a7d9-74d2-9a60-adee64fa1cc0",
  type: "page-type/movie",
  slug: "walking-the-dog",
  ownLength: 83,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2017-02-04",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "437513",
      externalLink: "https://www.themoviedb.org/movie/437513",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Walking the Dog",
  genres: ["TV Movie", "Comedy", "Romance"],
  imdbId: "tt6439776",
  posterPath: "/uKP3CiBZXqFd8wy6BNP0joj8vQ0.jpg",
  voteAverage: 5.5,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "Tubi TV",
    "YouTube Free",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:29.458Z",
  updatedAt: "2026-10-25T19:46:29.458Z",
} as const satisfies Movie
