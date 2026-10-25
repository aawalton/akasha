import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const avengingAngel = {
  id: "01a17497-3824-71db-9282-c9da03c4ab6c",
  type: "page-type/movie",
  slug: "avenging-angel",
  ownLength: 81,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2007-07-07",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "63374",
      externalLink: "https://www.themoviedb.org/movie/63374",
      lastSyncedAt: "2026-10-25",
    },
    {
      source: "wikipedia",
      externalLink: "https://en.wikipedia.org/wiki/Avenging_Angel_(2007_film)",
    },
  ],
  title: "Avenging Angel",
  genres: ["Drama", "Action", "Western", "Thriller", "TV Movie"],
  imdbId: "tt1001491",
  posterPath: "/ilXZ9WM319FqhWaWlOj7ymsdijN.jpg",
  voteAverage: 4.7,
  createdAt: "2026-10-25T19:43:49.795Z",
  updatedAt: "2026-10-25T19:43:49.795Z",
} as const satisfies Movie
