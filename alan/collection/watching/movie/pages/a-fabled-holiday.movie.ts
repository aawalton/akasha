import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const aFabledHoliday = {
  id: "01a1749a-4648-7237-9949-23c2735a511a",
  type: "page-type/movie",
  slug: "a-fabled-holiday",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2022-12-03",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1028548",
      externalLink: "https://www.themoviedb.org/movie/1028548",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "A Fabled Holiday",
  genres: ["TV Movie", "Comedy", "Drama", "Romance"],
  imdbId: "tt22295836",
  posterPath: "/oB84nCDF6vxdgSxlmvyFfEqZ9SS.jpg",
  voteAverage: 6.157,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:10.024Z",
  updatedAt: "2026-10-25T19:47:10.024Z",
} as const satisfies Movie
