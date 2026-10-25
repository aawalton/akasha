import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const aKellerChristmasVacation = {
  id: "01a1749a-a948-7166-962c-607085cdca37",
  type: "page-type/movie",
  slug: "a-keller-christmas-vacation",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2025-11-09",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1547913",
      externalLink: "https://www.themoviedb.org/movie/1547913",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "A Keller Christmas Vacation",
  genres: ["Family", "TV Movie", "Comedy", "Adventure"],
  imdbId: "tt38353730",
  posterPath: "/4RiHKqA8d36YKvkbfl0YCcPLgt1.jpg",
  voteAverage: 5.833,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:35.367Z",
  updatedAt: "2026-10-25T19:47:35.367Z",
} as const satisfies Movie
