import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const thePerfectBrideWeddingBells = {
  id: "01a17499-c95f-760b-9adb-b2c3cccfddd2",
  type: "page-type/movie",
  slug: "the-perfect-bride-wedding-bells",
  ownLength: 90,
  ownProgress: 0,
  partOfCollections: ["franchise/the-perfect-bride"],
  position: 1,
  publishedAt: "2018-06-09",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "525453",
      externalLink: "https://www.themoviedb.org/movie/525453",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "The Perfect Bride: Wedding Bells",
  genres: ["Romance", "TV Movie"],
  imdbId: "tt8231086",
  posterPath: "/sSEzaWf7UrjVLrpZLaBawWkKl2l.jpg",
  voteAverage: 6.5,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "YouTube TV",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:38.041Z",
  updatedAt: "2026-10-25T19:46:38.041Z",
} as const satisfies Movie
