import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const aCrushOnYou = {
  id: "01a17499-669c-7a53-bab1-885eb3535eeb",
  type: "page-type/movie",
  slug: "a-crush-on-you",
  ownLength: 85,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-mystery"],
  publishedAt: "2011-06-11",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "185564",
      externalLink: "https://www.themoviedb.org/movie/185564",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "A Crush on You",
  genres: ["Romance", "Comedy", "TV Movie"],
  imdbId: "tt1714202",
  posterPath: "/cuUhsAqx37kgwVWfLSkXudXyWjk.jpg",
  voteAverage: 5.7,
  streamingOn: ["Xumo Play"],
  createdAt: "2026-10-25T19:46:12.764Z",
  updatedAt: "2026-10-25T19:46:12.764Z",
} as const satisfies Movie
