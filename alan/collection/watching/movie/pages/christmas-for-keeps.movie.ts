import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const christmasForKeeps = {
  id: "01a1749a-464a-7871-a15f-267970b11d86",
  type: "page-type/movie",
  slug: "christmas-for-keeps",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2021-12-18",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "877833",
      externalLink: "https://www.themoviedb.org/movie/877833",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Christmas for Keeps",
  genres: ["TV Movie", "Comedy", "Romance"],
  imdbId: "tt16047292",
  posterPath: "/yeKwo7fu6MGKqFB5Uc5TO5Y4Mm1.jpg",
  voteAverage: 5.4,
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
