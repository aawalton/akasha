import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const christmasAtPemberleyManor = {
  id: "01a17499-c95a-7c34-90e6-bbd59fa21c4a",
  type: "page-type/movie",
  slug: "christmas-at-pemberley-manor",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2018-10-27",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "549301",
      externalLink: "https://www.themoviedb.org/movie/549301",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Christmas at Pemberley Manor",
  genres: ["Romance", "TV Movie"],
  imdbId: "tt8498184",
  posterPath: "/a9Dja61XK00gxXdl5pwFZUO0cYY.jpg",
  voteAverage: 6.226,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:38.041Z",
  updatedAt: "2026-10-25T19:46:38.041Z",
} as const satisfies Movie
