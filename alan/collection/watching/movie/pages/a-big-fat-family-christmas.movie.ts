import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const aBigFatFamilyChristmas = {
  id: "01a1749a-4648-7430-8a28-178aa3ba69f9",
  type: "page-type/movie",
  slug: "a-big-fat-family-christmas",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2022-12-02",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1028559",
      externalLink: "https://www.themoviedb.org/movie/1028559",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "A Big Fat Family Christmas",
  genres: ["TV Movie", "Comedy", "Drama", "Romance"],
  imdbId: "tt22262600",
  posterPath: "/wXLq886vVdKk6EgnhlszFXoXser.jpg",
  voteAverage: 5.3,
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
