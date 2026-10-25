import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const mysteryOnMistletoeLane = {
  id: "01a1749a-89aa-7c54-8653-6184993b6b39",
  type: "page-type/movie",
  slug: "mystery-on-mistletoe-lane",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2023-11-09",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1180844",
      externalLink: "https://www.themoviedb.org/movie/1180844",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Mystery on Mistletoe Lane",
  genres: ["Mystery"],
  imdbId: "tt29233371",
  posterPath: "/4QQBgZxhcjWfy3VXap52WGNobD4.jpg",
  voteAverage: 6.2,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:27.269Z",
  updatedAt: "2026-10-25T19:47:27.269Z",
} as const satisfies Movie
