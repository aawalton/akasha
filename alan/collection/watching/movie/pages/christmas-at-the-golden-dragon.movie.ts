import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const christmasAtTheGoldenDragon = {
  id: "01a1749a-4649-7c0d-9cb9-4229ded16322",
  type: "page-type/movie",
  slug: "christmas-at-the-golden-dragon",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2022-11-13",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1028186",
      externalLink: "https://www.themoviedb.org/movie/1028186",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Christmas at the Golden Dragon",
  genres: ["TV Movie", "Comedy", "Drama", "Romance"],
  imdbId: "tt13937754",
  posterPath: "/yOARNu1KqgU6CathaT4PK1qYWGX.jpg",
  voteAverage: 6.3,
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
