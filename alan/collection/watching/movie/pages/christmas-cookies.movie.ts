import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const christmasCookies = {
  id: "01a17499-a7d3-7405-9c87-cc2068635dfa",
  type: "page-type/movie",
  slug: "christmas-cookies",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2016-11-13",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "410317",
      externalLink: "https://www.themoviedb.org/movie/410317",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Christmas Cookies",
  genres: ["TV Movie", "Romance", "Drama"],
  imdbId: "tt5675936",
  posterPath: "/ut0buWDVWX3xOdFco7ODrmHeVWh.jpg",
  voteAverage: 5.969,
  streamingOn: [
    "streaming-service/fubotv",
    "streaming-service/hallmark-plus",
    "streaming-service/hallmark-tv",
    "streaming-service/philo",
  ],
  createdAt: "2026-10-25T19:46:29.458Z",
  updatedAt: "2026-10-28T20:38:30.445Z",
} as const satisfies Movie
