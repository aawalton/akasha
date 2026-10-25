import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const fourthDownAndLove = {
  id: "01a1749a-66bd-756d-bb72-6bd5f38adf27",
  type: "page-type/movie",
  slug: "fourth-down-and-love",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2023-09-09",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1158690",
      externalLink: "https://www.themoviedb.org/movie/1158690",
      lastSyncedAt: "2026-10-25",
    },
    { source: "wikipedia", externalLink: "https://en.wikipedia.org/wiki/Fourth_Down_and_Love" },
  ],
  title: "Fourth Down and Love",
  genres: ["TV Movie", "Comedy", "Romance"],
  imdbId: "tt20869180",
  posterPath: "/nWtuQ1SeJM1f6zuEj2l3NpFOTsJ.jpg",
  voteAverage: 6.6,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "YouTube TV",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:18.330Z",
  updatedAt: "2026-10-25T19:47:18.330Z",
} as const satisfies Movie
