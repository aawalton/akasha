import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const frankenstein = {
  id: "01a17497-3826-7ddb-9b42-ed9f27f5fb6c",
  type: "page-type/movie",
  slug: "frankenstein",
  ownLength: 88,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-mystery"],
  publishedAt: "2004-10-05",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "3056",
      externalLink: "https://www.themoviedb.org/movie/3056",
      lastSyncedAt: "2026-10-25",
    },
    {
      source: "wikipedia",
      externalLink: "https://en.wikipedia.org/wiki/Frankenstein_(miniseries)",
    },
  ],
  title: "Frankenstein",
  genres: ["TV Movie", "Drama", "Horror", "Science Fiction", "Mystery"],
  imdbId: "tt0397430",
  posterPath: "/gmeccZOjv2l12NM7dTjHXTYHaC4.jpg",
  voteAverage: 5.18,
  streamingOn: [
    "streaming-service/moviesphere-plus",
    "streaming-service/plex",
    "streaming-service/the-cw",
    "streaming-service/the-roku-channel",
    "streaming-service/tubi",
    "streaming-service/youtube-free",
  ],
  createdAt: "2026-10-25T19:43:49.795Z",
  updatedAt: "2026-10-28T20:38:30.445Z",
} as const satisfies Movie
