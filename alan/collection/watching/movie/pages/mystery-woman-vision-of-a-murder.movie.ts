import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const mysteryWomanVisionOfAMurder = {
  id: "01a17497-382a-7b20-8e82-ab82a4fb26de",
  type: "page-type/movie",
  slug: "mystery-woman-vision-of-a-murder",
  ownLength: 120,
  ownProgress: 0,
  partOfCollections: ["franchise/mystery-woman"],
  position: 5,
  publishedAt: "2005-06-05",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "125801",
      externalLink: "https://www.themoviedb.org/movie/125801",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Mystery Woman: Vision of a Murder",
  genres: ["Mystery", "Crime", "Thriller", "TV Movie"],
  imdbId: "tt0439719",
  posterPath: "/zlLnStd8kUQfDKToFiMBCSc9cRf.jpg",
  voteAverage: 5.2,
  streamingOn: ["UP Faith & Family Amazon Channel ", "UP Faith & Family Apple TV channel"],
  createdAt: "2026-10-25T19:43:49.795Z",
  updatedAt: "2026-10-25T20:44:53.349Z",
} as const satisfies Movie
