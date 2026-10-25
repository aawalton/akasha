import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const aPlaceCalledHome = {
  id: "01a17497-3824-7403-8e34-b972e92a0bad",
  type: "page-type/movie",
  slug: "a-place-called-home",
  ownLength: 88,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2004-03-07",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "123231",
      externalLink: "https://www.themoviedb.org/movie/123231",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "A Place Called Home",
  genres: ["Drama", "TV Movie"],
  imdbId: "tt0375139",
  posterPath: "/69DU7jMPGV954wfO5tYKz7hea5T.jpg",
  voteAverage: 5.9,
  streamingOn: ["Xumo Play"],
  createdAt: "2026-10-25T19:43:49.795Z",
  updatedAt: "2026-10-25T19:43:49.795Z",
} as const satisfies Movie
