import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const christmasByDesign = {
  id: "01a1749a-66bc-78f1-b25d-04c6d2f83e1d",
  type: "page-type/movie",
  slug: "christmas-by-design",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2023-10-27",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1132358",
      externalLink: "https://www.themoviedb.org/movie/1132358",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Christmas by Design",
  genres: ["TV Movie", "Comedy", "Romance", "Drama"],
  imdbId: "tt29392874",
  posterPath: "/8MEsob7jdreBqu3qghBQ7m1zxJ8.jpg",
  voteAverage: 6,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:18.330Z",
  updatedAt: "2026-10-25T19:47:18.330Z",
} as const satisfies Movie
