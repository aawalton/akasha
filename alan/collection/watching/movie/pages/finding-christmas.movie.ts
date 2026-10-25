import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const findingChristmas = {
  id: "01a17499-669e-7a9f-bdf6-8a367c69a94c",
  type: "page-type/movie",
  slug: "finding-christmas",
  ownLength: 120,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2013-12-15",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "249057",
      externalLink: "https://www.themoviedb.org/movie/249057",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Finding Christmas",
  genres: ["Family", "Comedy", "Romance", "TV Movie"],
  imdbId: "tt2964654",
  posterPath: "/1mgLKQYIY9HGyEl7pF54Y6OVG1.jpg",
  voteAverage: 6.4,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "Tubi TV",
  ],
  createdAt: "2026-10-25T19:46:12.764Z",
  updatedAt: "2026-10-25T19:46:12.764Z",
} as const satisfies Movie
