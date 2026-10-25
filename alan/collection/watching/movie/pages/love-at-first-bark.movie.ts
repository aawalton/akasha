import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const loveAtFirstBark = {
  id: "01a17499-a7d5-7435-9807-e7e524790ce2",
  type: "page-type/movie",
  slug: "love-at-first-bark",
  ownLength: 90,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2017-04-01",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "446483",
      externalLink: "https://www.themoviedb.org/movie/446483",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Love at First Bark",
  genres: ["Romance", "TV Movie"],
  imdbId: "tt6456614",
  posterPath: "/WnKi7fozcNAzJ6vQ9TXx4atmr6.jpg",
  voteAverage: 6.4,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "Plex",
    "Plex Channel",
    "The Roku Channel",
    "YouTube Free",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:29.458Z",
  updatedAt: "2026-10-25T19:46:29.458Z",
} as const satisfies Movie
