import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const loveBlossoms = {
  id: "01a17499-a7d6-70aa-995a-6832e111cf75",
  type: "page-type/movie",
  slug: "love-blossoms",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2017-02-18",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "442154",
      externalLink: "https://www.themoviedb.org/movie/442154",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Love Blossoms",
  genres: ["TV Movie", "Romance", "Drama"],
  imdbId: "tt6455992",
  posterPath: "/wlpBFrmPsMsh6upoGg2Zuqog07a.jpg",
  voteAverage: 6.2,
  streamingOn: [
    "streaming-service/fubotv",
    "streaming-service/hallmark-plus",
    "streaming-service/hallmark-tv",
    "streaming-service/philo",
    "streaming-service/plex",
    "streaming-service/the-roku-channel",
    "streaming-service/tubi",
    "streaming-service/youtube-free",
    "streaming-service/youtube-tv",
  ],
  createdAt: "2026-10-25T19:46:29.458Z",
  updatedAt: "2026-10-28T20:38:30.445Z",
} as const satisfies Movie
