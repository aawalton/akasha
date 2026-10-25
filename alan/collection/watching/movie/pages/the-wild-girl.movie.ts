import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const theWildGirl = {
  id: "01a17499-470f-7b48-a860-979538bf4a37",
  type: "page-type/movie",
  slug: "the-wild-girl",
  ownLength: 150,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-mystery"],
  publishedAt: "2010-04-24",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "123871",
      externalLink: "https://www.themoviedb.org/movie/123871",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "The Wild Girl",
  genres: ["Drama", "TV Movie"],
  imdbId: "tt1496009",
  posterPath: "/dygTS013wkz5iXsqGVDkaVoxi1r.jpg",
  voteAverage: 3.5,
  streamingOn: ["Cineverse"],
  createdAt: "2026-10-25T19:46:04.682Z",
  updatedAt: "2026-10-25T19:46:04.682Z",
} as const satisfies Movie
