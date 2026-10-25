import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const murderSheBakedADeadlyRecipe = {
  id: "01a17499-a7d6-73cb-828f-be6a26d40243",
  type: "page-type/movie",
  slug: "murder-she-baked-a-deadly-recipe",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["franchise/hannah-swensen-mysteries"],
  position: 3,
  publishedAt: "2016-06-19",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "392629",
      externalLink: "https://www.themoviedb.org/movie/392629",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Murder, She Baked: A Deadly Recipe",
  genres: ["Mystery", "TV Movie"],
  imdbId: "tt5673202",
  posterPath: "/7DC9LYpEKu3nj7tRkahOKwB8Lp5.jpg",
  voteAverage: 7.006,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "YouTube TV",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:29.458Z",
  updatedAt: "2026-10-25T19:46:29.458Z",
} as const satisfies Movie
