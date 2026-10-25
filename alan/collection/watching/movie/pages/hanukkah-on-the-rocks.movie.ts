import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const hanukkahOnTheRocks = {
  id: "01a1749a-89a8-7ea4-8764-ef1ef98c7282",
  type: "page-type/movie",
  slug: "hanukkah-on-the-rocks",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2024-12-13",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1361222",
      externalLink: "https://www.themoviedb.org/movie/1361222",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Hanukkah on the Rocks",
  genres: ["Romance"],
  imdbId: "tt33478583",
  posterPath: "/mJ5eNzCXpOEQN9NA5AsUgsS5Dv0.jpg",
  voteAverage: 5,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:27.269Z",
  updatedAt: "2026-10-25T19:47:27.269Z",
} as const satisfies Movie
