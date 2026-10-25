import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const aGiftOfMiracles = {
  id: "01a17499-8943-7eeb-806e-8883a8c19e70",
  type: "page-type/movie",
  slug: "a-gift-of-miracles",
  ownLength: 88,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-mystery"],
  publishedAt: "2015-02-15",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "323384",
      externalLink: "https://www.themoviedb.org/movie/323384",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "A Gift of Miracles",
  genres: ["Drama", "Romance", "TV Movie"],
  imdbId: "tt4137596",
  posterPath: "/2QlqhaWoW5z1WbNZLpCdrkeV0QA.jpg",
  voteAverage: 5.8,
  streamingOn: ["Philo", "fuboTV"],
  createdAt: "2026-10-25T19:46:21.634Z",
  updatedAt: "2026-10-25T19:46:21.634Z",
} as const satisfies Movie
