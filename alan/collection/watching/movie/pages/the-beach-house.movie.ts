import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const theBeachHouse = {
  id: "01a17499-c95f-72fd-8366-352cc309cf31",
  type: "page-type/movie",
  slug: "the-beach-house",
  ownLength: 90,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2018-04-28",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "521190",
      externalLink: "https://www.themoviedb.org/movie/521190",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "The Beach House",
  genres: ["TV Movie", "Romance", "Drama"],
  imdbId: "tt7598968",
  posterPath: "/gdGh7K00iaeD03EYqtXT70bivf4.jpg",
  voteAverage: 6.289,
  streamingOn: [
    "streaming-service/fubotv",
    "streaming-service/hallmark-plus",
    "streaming-service/hallmark-tv",
    "streaming-service/philo",
    "streaming-service/plex",
    "streaming-service/the-roku-channel",
    "streaming-service/tubi",
    "streaming-service/xumo-play",
    "streaming-service/youtube-free",
  ],
  createdAt: "2026-10-25T19:46:38.041Z",
  updatedAt: "2026-10-28T20:38:30.445Z",
} as const satisfies Movie
