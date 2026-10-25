import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const christmasInHarmony = {
  id: "01a1749a-2599-7db3-9bed-1f8077093540",
  type: "page-type/movie",
  slug: "christmas-in-harmony",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2021-10-29",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "874220",
      externalLink: "https://www.themoviedb.org/movie/874220",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Christmas in Harmony",
  genres: ["Comedy", "Romance", "TV Movie", "Drama"],
  imdbId: "tt15425920",
  posterPath: "/gf5hz6scIOfMj4VogPqxHaRFAre.jpg",
  voteAverage: 5,
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
