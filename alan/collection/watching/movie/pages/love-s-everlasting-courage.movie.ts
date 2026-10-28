import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const loveSEverlastingCourage = {
  id: "01a17499-66a0-74f3-b126-9a0b226bdbd0",
  type: "page-type/movie",
  slug: "love-s-everlasting-courage",
  ownLength: 89,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2011-10-01",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "87311",
      externalLink: "https://www.themoviedb.org/movie/87311",
      lastSyncedAt: "2026-10-25",
    },
    {
      source: "wikipedia",
      externalLink: "https://en.wikipedia.org/wiki/Love's_Everlasting_Courage",
    },
  ],
  title: "Love's Everlasting Courage",
  genres: ["Drama", "Romance", "Western", "Family", "TV Movie"],
  imdbId: "tt1672621",
  posterPath: "/aIZoXDvpmwF70KsY8lByku5SwgF.jpg",
  voteAverage: 6.8,
  streamingOn: ["streaming-service/pixl", "streaming-service/up-faith-and-family"],
  createdAt: "2026-10-25T19:46:12.764Z",
  updatedAt: "2026-10-28T20:38:30.445Z",
} as const satisfies Movie
