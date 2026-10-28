import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const strandedInParadise = {
  id: "01a17499-8949-7e10-bb5f-416d4678d9ee",
  type: "page-type/movie",
  slug: "stranded-in-paradise",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2014-08-09",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "286071",
      externalLink: "https://www.themoviedb.org/movie/286071",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Stranded in Paradise",
  genres: ["Drama", "Romance", "Comedy", "TV Movie"],
  imdbId: "tt3815480",
  posterPath: "/mvfKbcP1dMo5a4tijQ7ReZFH62B.jpg",
  voteAverage: 6,
  streamingOn: [
    "streaming-service/fubotv",
    "streaming-service/hallmark-plus",
    "streaming-service/hallmark-tv",
    "streaming-service/philo",
    "streaming-service/plex",
    "streaming-service/pluto-tv",
    "streaming-service/the-roku-channel",
    "streaming-service/youtube-free",
  ],
  createdAt: "2026-10-25T19:46:21.634Z",
  updatedAt: "2026-10-28T20:38:30.445Z",
} as const satisfies Movie
