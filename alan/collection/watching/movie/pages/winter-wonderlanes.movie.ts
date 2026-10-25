import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const winterWonderlanes = {
  id: "01a1749a-c86c-72d6-a3c9-8730d69e0e2c",
  type: "page-type/movie",
  slug: "winter-wonderlanes",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2026-10-23",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1773195",
      externalLink: "https://www.themoviedb.org/movie/1773195",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Winter Wonderlanes",
  genres: ["TV Movie", "Comedy", "Romance"],
  imdbId: "tt46071555",
  posterPath: "/yNCm44kxZ938J7XrNWawGUVXaUf.jpg",
  voteAverage: 0,
  streamingOn: ["Philo"],
  createdAt: "2026-10-25T19:47:43.335Z",
  updatedAt: "2026-10-25T19:47:43.335Z",
} as const satisfies Movie
