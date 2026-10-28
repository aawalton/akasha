import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const guidingEmily = {
  id: "01a1749a-89a8-7b2c-8973-def3d9d040d7",
  type: "page-type/movie",
  slug: "guiding-emily",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-mystery"],
  publishedAt: "2023-09-08",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1150513",
      externalLink: "https://www.themoviedb.org/movie/1150513",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Guiding Emily",
  genres: ["TV Movie", "Comedy", "Drama", "Romance"],
  imdbId: "tt28338336",
  posterPath: "/amJHrFXIDI5tubfelFiUux0THvu.jpg",
  voteAverage: 8.2,
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
  createdAt: "2026-10-25T19:47:27.269Z",
  updatedAt: "2026-10-28T20:38:30.445Z",
} as const satisfies Movie
