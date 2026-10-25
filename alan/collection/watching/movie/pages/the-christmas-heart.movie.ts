import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const theChristmasHeart = {
  id: "01a17499-66a2-75d9-b984-05e7bf9d2be6",
  type: "page-type/movie",
  slug: "the-christmas-heart",
  ownLength: 86,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2012-12-02",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "149229",
      externalLink: "https://www.themoviedb.org/movie/149229",
      lastSyncedAt: "2026-10-25",
    },
    { source: "wikipedia", externalLink: "https://en.wikipedia.org/wiki/The_Christmas_Heart" },
  ],
  title: "The Christmas Heart",
  genres: ["Drama", "Family", "TV Movie"],
  imdbId: "tt2415468",
  posterPath: "/sktMzeguQdNjOXT0wOxRV8YUZrp.jpg",
  voteAverage: 5.8,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "The Roku Channel",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:12.764Z",
  updatedAt: "2026-10-25T19:46:12.764Z",
} as const satisfies Movie
