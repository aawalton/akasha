import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const howToFallInLove = {
  id: "01a17499-669f-7dfc-8686-e0fbdc3a0975",
  type: "page-type/movie",
  slug: "how-to-fall-in-love",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2012-07-21",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "158150",
      externalLink: "https://www.themoviedb.org/movie/158150",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "How to Fall in Love",
  genres: ["Comedy", "Romance", "TV Movie"],
  imdbId: "tt2395247",
  posterPath: "/vpZavsKDpoAyNoeXFTpVW8Q6R8A.jpg",
  voteAverage: 6.044,
  streamingOn: ["Cineverse Amazon Channel", "Dove Amazon Channel"],
  createdAt: "2026-10-25T19:46:12.764Z",
  updatedAt: "2026-10-25T19:46:12.764Z",
} as const satisfies Movie
