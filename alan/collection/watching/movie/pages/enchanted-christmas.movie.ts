import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const enchantedChristmas = {
  id: "01a17499-c95c-709f-850c-f9823f773502",
  type: "page-type/movie",
  slug: "enchanted-christmas",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2017-11-12",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "474978",
      externalLink: "https://www.themoviedb.org/movie/474978",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Enchanted Christmas",
  genres: ["Romance", "TV Movie"],
  imdbId: "tt7030416",
  posterPath: "/tWR2JcvR8uWNhzze03Q7ZXMwsgH.jpg",
  voteAverage: 6.306,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "Pluto TV",
    "Tubi TV",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:38.041Z",
  updatedAt: "2026-10-25T19:46:38.041Z",
} as const satisfies Movie
