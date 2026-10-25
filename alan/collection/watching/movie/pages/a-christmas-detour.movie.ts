import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const aChristmasDetour = {
  id: "01a17499-8942-7bd2-b7ae-223fe9541e94",
  type: "page-type/movie",
  slug: "a-christmas-detour",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2015-11-28",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "348634",
      externalLink: "https://www.themoviedb.org/movie/348634",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "A Christmas Detour",
  genres: ["TV Movie", "Comedy", "Romance"],
  imdbId: "tt4767950",
  posterPath: "/ogBVg6Bowu3Y5zagUX4z8x2q4OL.jpg",
  voteAverage: 6.1,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:21.634Z",
  updatedAt: "2026-10-25T19:46:21.634Z",
} as const satisfies Movie
