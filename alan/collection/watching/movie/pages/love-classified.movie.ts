import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const loveClassified = {
  id: "01a1749a-464b-7b3f-8a9c-ea429c7606c8",
  type: "page-type/movie",
  slug: "love-classified",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2022-04-16",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "939575",
      externalLink: "https://www.themoviedb.org/movie/939575",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Love, Classified",
  genres: ["TV Movie", "Comedy", "Romance", "Drama"],
  imdbId: "tt17506016",
  posterPath: "/h6oA5yWqcCyZ0q5358059jz5f8b.jpg",
  voteAverage: 6.6,
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
  createdAt: "2026-10-25T19:47:10.024Z",
  updatedAt: "2026-10-28T20:38:30.445Z",
} as const satisfies Movie
