import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const sweetCarolina = {
  id: "01a1749a-259d-77cd-a634-c2ad80709e28",
  type: "page-type/movie",
  slug: "sweet-carolina",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2021-05-15",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "819701",
      externalLink: "https://www.themoviedb.org/movie/819701",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Sweet Carolina",
  genres: ["TV Movie", "Romance", "Family", "Drama"],
  imdbId: "tt14477372",
  posterPath: "/hsjBwsv3opnYXbv6syyn7kkBxiy.jpg",
  voteAverage: 7,
  streamingOn: [
    "streaming-service/fubotv",
    "streaming-service/hallmark-plus",
    "streaming-service/hallmark-tv",
    "streaming-service/history-vault",
    "streaming-service/philo",
    "streaming-service/pluto-tv",
    "streaming-service/youtube-tv",
  ],
  createdAt: "2026-10-25T19:47:01.655Z",
  updatedAt: "2026-10-28T20:38:30.445Z",
} as const satisfies Movie
