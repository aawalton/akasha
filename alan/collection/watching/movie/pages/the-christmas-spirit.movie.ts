import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const theChristmasSpirit = {
  id: "01a17499-66a2-7c43-a993-a09eb4f62d7f",
  type: "page-type/movie",
  slug: "the-christmas-spirit",
  ownLength: 86,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2013-12-01",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "241903",
      externalLink: "https://www.themoviedb.org/movie/241903",
      lastSyncedAt: "2026-10-25",
    },
    {
      source: "wikipedia",
      externalLink: "https://en.wikipedia.org/wiki/The_Christmas_Spirit_(film)",
    },
  ],
  title: "The Christmas Spirit",
  genres: ["Comedy", "Drama", "Romance", "TV Movie"],
  imdbId: "tt3101386",
  posterPath: "/onijNy3kGnpOLtFKiMwGRLRvb9Z.jpg",
  voteAverage: 5,
  streamingOn: [
    "AMC Plus Apple TV channel",
    "AMC+",
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "Shudder",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:12.764Z",
  updatedAt: "2026-10-25T19:46:12.764Z",
} as const satisfies Movie
