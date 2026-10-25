import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const aGlenbrookeChristmas = {
  id: "01a1749a-2598-70d6-b311-6fecab054161",
  type: "page-type/movie",
  slug: "a-glenbrooke-christmas",
  ownLength: 85,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2020-12-12",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "746056",
      externalLink: "https://www.themoviedb.org/movie/746056",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "A Glenbrooke Christmas",
  genres: ["Romance", "TV Movie"],
  imdbId: "tt13197624",
  posterPath: "/i2Q7WtmhXlDp8rDwTdmKBxiIMTZ.jpg",
  voteAverage: 6.5,
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
