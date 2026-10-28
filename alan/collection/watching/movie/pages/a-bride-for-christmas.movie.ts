import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const aBrideForChristmas = {
  id: "01a17499-669c-728d-a7a3-5f11f68520b3",
  type: "page-type/movie",
  slug: "a-bride-for-christmas",
  ownLength: 90,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2012-12-01",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "147132",
      externalLink: "https://www.themoviedb.org/movie/147132",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "A Bride for Christmas",
  genres: ["Romance", "Comedy", "TV Movie"],
  imdbId: "tt2415112",
  posterPath: "/d5oFtJZI0PREMTft27lgW4nr7JV.jpg",
  voteAverage: 6.3,
  streamingOn: [
    "streaming-service/amazon-prime-video",
    "streaming-service/fubotv",
    "streaming-service/hallmark-plus",
    "streaming-service/hallmark-tv",
    "streaming-service/philo",
  ],
  createdAt: "2026-10-25T19:46:12.764Z",
  updatedAt: "2026-10-28T20:38:30.445Z",
} as const satisfies Movie
