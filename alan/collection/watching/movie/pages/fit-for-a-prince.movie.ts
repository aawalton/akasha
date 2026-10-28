import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const fitForAPrince = {
  id: "01a1749a-259a-76b7-91c5-425420c42d82",
  type: "page-type/movie",
  slug: "fit-for-a-prince",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2021-03-06",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "793423",
      externalLink: "https://www.themoviedb.org/movie/793423",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Fit for a Prince",
  genres: ["TV Movie", "Romance", "Comedy", "Drama"],
  imdbId: "tt14039028",
  posterPath: "/vFy2okoNPFN7tTVhjtoIgm2okji.jpg",
  voteAverage: 6.7,
  streamingOn: [
    "streaming-service/fubotv",
    "streaming-service/hallmark-plus",
    "streaming-service/hallmark-tv",
    "streaming-service/philo",
    "streaming-service/plex",
    "streaming-service/the-roku-channel",
    "streaming-service/youtube-free",
    "streaming-service/youtube-tv",
  ],
  createdAt: "2026-10-25T19:47:01.655Z",
  updatedAt: "2026-10-28T20:38:30.445Z",
} as const satisfies Movie
