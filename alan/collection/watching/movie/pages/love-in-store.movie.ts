import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const loveInStore = {
  id: "01a1749a-06bd-73c5-b535-bcaf509eb529",
  type: "page-type/movie",
  slug: "love-in-store",
  ownLength: 82,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2020-02-22",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "661336",
      externalLink: "https://www.themoviedb.org/movie/661336",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Love in Store",
  genres: ["Romance", "TV Movie", "Drama"],
  imdbId: "tt10606866",
  posterPath: "/bp38RHebj0UKLy4C5cqtWcLaqq.jpg",
  voteAverage: 6.6,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "Pluto TV",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:53.752Z",
  updatedAt: "2026-10-25T19:46:53.752Z",
} as const satisfies Movie
