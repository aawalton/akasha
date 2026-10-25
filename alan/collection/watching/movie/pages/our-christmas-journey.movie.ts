import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const ourChristmasJourney = {
  id: "01a1749a-464c-7e9e-af58-a12b4067eba2",
  type: "page-type/movie",
  slug: "our-christmas-journey",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2021-12-04",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "874190",
      externalLink: "https://www.themoviedb.org/movie/874190",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Our Christmas Journey",
  genres: ["Comedy", "Romance", "TV Movie"],
  imdbId: "tt15463198",
  posterPath: "/fQ7eV7wAJruPCJNH5OONlP2RAer.jpg",
  voteAverage: 5.55,
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
