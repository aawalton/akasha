import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const loveLightsHanukkah = {
  id: "01a1749a-259b-71c4-ba27-f051b0a4ea35",
  type: "page-type/movie",
  slug: "love-lights-hanukkah",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2020-12-12",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "746062",
      externalLink: "https://www.themoviedb.org/movie/746062",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Love, Lights, Hanukkah!",
  genres: ["TV Movie", "Drama"],
  imdbId: "tt13342190",
  posterPath: "/fPwBjXBgT8tOmtLuIIrBveYaa7f.jpg",
  voteAverage: 6.8,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:01.655Z",
  updatedAt: "2026-10-25T19:47:01.655Z",
} as const satisfies Movie
