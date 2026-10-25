import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const theGamblerTheGirlAndTheGunslinger = {
  id: "01a17499-470e-7e20-878b-c9c5fac9c04b",
  type: "page-type/movie",
  slug: "the-gambler-the-girl-and-the-gunslinger",
  ownLength: 95,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2009-07-11",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "33128",
      externalLink: "https://www.themoviedb.org/movie/33128",
      lastSyncedAt: "2026-10-25",
    },
    {
      source: "wikipedia",
      externalLink: "https://en.wikipedia.org/wiki/The_Gambler,_the_Girl_and_the_Gunslinger",
    },
  ],
  title: "The Gambler, the Girl and the Gunslinger",
  genres: ["Action", "Comedy", "TV Movie", "Western"],
  imdbId: "tt1434457",
  posterPath: "/7ruGgpnN3fhmZpp6IkN3tbXMfyL.jpg",
  voteAverage: 4.5,
  createdAt: "2026-10-25T19:46:04.682Z",
  updatedAt: "2026-10-25T19:46:04.682Z",
} as const satisfies Movie
