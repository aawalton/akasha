import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const helloItSMe = {
  id: "01a17499-8945-7a28-a9da-41c741317ee8",
  type: "page-type/movie",
  slug: "hello-it-s-me",
  ownLength: 85,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-mystery"],
  publishedAt: "2015-09-27",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "361749",
      externalLink: "https://www.themoviedb.org/movie/361749",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Hello, It's Me",
  genres: ["Mystery", "Drama", "Romance", "TV Movie"],
  imdbId: "tt5063384",
  posterPath: "/2xJG0DYwWFc2wO5KGZ8zxmTyhKr.jpg",
  voteAverage: 6.6,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "Plex Channel",
    "The Roku Channel",
    "YouTube Free",
    "YouTube TV",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:21.634Z",
  updatedAt: "2026-10-25T19:46:21.634Z",
} as const satisfies Movie
