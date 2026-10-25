import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const aChristmasCookieCatastrophe = {
  id: "01a1749a-4648-7bad-8198-cd1686449965",
  type: "page-type/movie",
  slug: "a-christmas-cookie-catastrophe",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2022-11-27",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1028552",
      externalLink: "https://www.themoviedb.org/movie/1028552",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "A Christmas Cookie Catastrophe",
  genres: ["TV Movie", "Comedy", "Drama", "Romance"],
  imdbId: "tt22207828",
  posterPath: "/uKow4E46OiKD70nyQLn0KgkGfxN.jpg",
  voteAverage: 5.6,
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
