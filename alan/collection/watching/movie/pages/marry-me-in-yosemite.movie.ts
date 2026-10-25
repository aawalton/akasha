import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const marryMeInYosemite = {
  id: "01a1749a-464c-7acf-8e2b-c9253e47c26c",
  type: "page-type/movie",
  slug: "marry-me-in-yosemite",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2022-09-03",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1006267",
      externalLink: "https://www.themoviedb.org/movie/1006267",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Marry Me in Yosemite",
  genres: ["TV Movie", "Comedy", "Romance"],
  imdbId: "tt21292672",
  posterPath: "/vT5bCzDoti5YW4SqOzzkw7bDUuo.jpg",
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
