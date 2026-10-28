import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const oneSummer = {
  id: "01a1749a-464c-7a07-b68e-817e9c4e9e66",
  type: "page-type/movie",
  slug: "one-summer",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-mystery"],
  publishedAt: "2021-10-03",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "858918",
      externalLink: "https://www.themoviedb.org/movie/858918",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "One Summer",
  genres: ["TV Movie", "Drama", "Family", "Romance"],
  imdbId: "tt15208950",
  posterPath: "/yRjSB2Uq3EwGn2ej0I8H78hWaCy.jpg",
  voteAverage: 7.4,
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
  createdAt: "2026-10-25T19:47:10.024Z",
  updatedAt: "2026-10-28T20:38:30.445Z",
} as const satisfies Movie
