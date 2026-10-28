import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const leadWithYourHeart = {
  id: "01a17499-8946-7d62-b89d-d73a5237f440",
  type: "page-type/movie",
  slug: "lead-with-your-heart",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2015-09-19",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "352845",
      externalLink: "https://www.themoviedb.org/movie/352845",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Lead With Your Heart",
  genres: ["TV Movie", "Drama", "Romance"],
  imdbId: "tt4882698",
  posterPath: "/bgPTJjauHlJHoRKWzK1FobOTtGV.jpg",
  voteAverage: 3.9,
  streamingOn: [
    "streaming-service/fubotv",
    "streaming-service/hallmark-plus",
    "streaming-service/hallmark-tv",
    "streaming-service/philo",
    "streaming-service/plex",
    "streaming-service/the-roku-channel",
    "streaming-service/tubi",
    "streaming-service/youtube-free",
  ],
  createdAt: "2026-10-25T19:46:21.634Z",
  updatedAt: "2026-10-28T20:38:30.445Z",
} as const satisfies Movie
