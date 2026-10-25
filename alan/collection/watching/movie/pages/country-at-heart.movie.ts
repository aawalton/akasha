import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const countryAtHeart = {
  id: "01a1749a-06bb-7fb7-a59c-955799e11aea",
  type: "page-type/movie",
  slug: "country-at-heart",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2020-10-03",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "631278",
      externalLink: "https://www.themoviedb.org/movie/631278",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Country at Heart",
  genres: ["Romance", "Music", "TV Movie"],
  imdbId: "tt10887492",
  posterPath: "/j5RN7ciOcgg0mCVJdkY4PsCyFOC.jpg",
  voteAverage: 6.447,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "YouTube TV",
  ],
  createdAt: "2026-10-25T19:46:53.752Z",
  updatedAt: "2026-10-25T19:46:53.752Z",
} as const satisfies Movie
