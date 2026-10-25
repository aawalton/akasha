import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const theLongShot = {
  id: "01a17497-382b-7e96-873e-708b33770de3",
  type: "page-type/movie",
  slug: "the-long-shot",
  ownLength: 94,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2004-04-18",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "52332",
      externalLink: "https://www.themoviedb.org/movie/52332",
      lastSyncedAt: "2026-10-25",
    },
    { source: "wikipedia", externalLink: "https://en.wikipedia.org/wiki/The_Long_Shot" },
  ],
  title: "The Long Shot",
  genres: ["Drama", "Family", "TV Movie"],
  imdbId: "tt0385638",
  posterPath: "/fM4ZpRQ891hxIV19ySQY7aTQMyR.jpg",
  voteAverage: 7.8,
  streamingOn: ["PixL Amazon Channel", "Xumo Play"],
  createdAt: "2026-10-25T19:43:49.795Z",
  updatedAt: "2026-10-25T19:43:49.795Z",
} as const satisfies Movie
