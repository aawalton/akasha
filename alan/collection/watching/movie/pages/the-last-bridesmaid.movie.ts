import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const theLastBridesmaid = {
  id: "01a17499-e806-71b1-a9ff-bed2af949de5",
  type: "page-type/movie",
  slug: "the-last-bridesmaid",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2019-06-22",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "603452",
      externalLink: "https://www.themoviedb.org/movie/603452",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "The Last Bridesmaid",
  genres: ["Romance", "TV Movie"],
  imdbId: "tt10136884",
  posterPath: "/gZBo4TCtsL4xuig4Zp9I5tuo0Wk.jpg",
  voteAverage: 6.6,
  streamingOn: [
    "streaming-service/fubotv",
    "streaming-service/hallmark-plus",
    "streaming-service/hallmark-tv",
    "streaming-service/philo",
    "streaming-service/youtube-tv",
  ],
  createdAt: "2026-10-25T19:46:45.888Z",
  updatedAt: "2026-10-28T20:38:30.445Z",
} as const satisfies Movie
