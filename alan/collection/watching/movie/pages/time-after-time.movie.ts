import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const timeAfterTime = {
  id: "01a17499-470f-7174-bc6a-49545a2e479b",
  type: "page-type/movie",
  slug: "time-after-time",
  ownLength: 89,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2011-03-19",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "198996",
      externalLink: "https://www.themoviedb.org/movie/198996",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Time after Time",
  genres: ["Romance", "TV Movie"],
  imdbId: "tt1761017",
  posterPath: "/gkLkTqI8zmzKDiOb5gSif1v9PkL.jpg",
  voteAverage: 5.7,
  streamingOn: [
    "streaming-service/amazon-mx-player",
    "streaming-service/amazon-prime-video",
    "streaming-service/amazon-prime-video-free-with-ads",
    "streaming-service/howdy",
    "streaming-service/shout-factory-tv",
    "streaming-service/the-roku-channel",
    "streaming-service/youtube-free",
  ],
  createdAt: "2026-10-25T19:46:04.682Z",
  updatedAt: "2026-10-28T20:38:30.445Z",
} as const satisfies Movie
