import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const mcbrideTheChameleonMurder = {
  id: "01a17497-3828-74a0-ac14-9595ad244fe3",
  type: "page-type/movie",
  slug: "mcbride-the-chameleon-murder",
  ownLength: 87,
  ownProgress: 0,
  partOfCollections: ["franchise/mcbride"],
  position: 0,
  publishedAt: "2005-01-14",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "257540",
      externalLink: "https://www.themoviedb.org/movie/257540",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "McBride: The Chameleon Murder",
  genres: ["Drama", "Mystery"],
  imdbId: "tt0426104",
  posterPath: "/cc1yJO6ksRJ4nyA4nOJ4lb5OzEP.jpg",
  voteAverage: 7.3,
  streamingOn: ["UP Faith & Family Amazon Channel ", "UP Faith & Family Apple TV channel"],
  createdAt: "2026-10-25T19:43:49.795Z",
  updatedAt: "2026-10-25T19:43:49.795Z",
} as const satisfies Movie
