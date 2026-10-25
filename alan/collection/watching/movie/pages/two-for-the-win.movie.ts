import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const twoForTheWin = {
  id: "01a1749a-259e-7722-a8e6-3acf84090ce6",
  type: "page-type/movie",
  slug: "two-for-the-win",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2021-01-16",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "775617",
      externalLink: "https://www.themoviedb.org/movie/775617",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Two for the Win",
  genres: ["Romance", "TV Movie"],
  imdbId: "tt13605268",
  posterPath: "/vEpXPa1onnKckMfM5wXKmy2YB1q.jpg",
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
