import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const angelAndTheBadman = {
  id: "01a17499-470b-75ae-96b9-eb9d9429ac72",
  type: "page-type/movie",
  slug: "angel-and-the-badman",
  ownLength: 95,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2009-07-05",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "30442",
      externalLink: "https://www.themoviedb.org/movie/30442",
      lastSyncedAt: "2026-10-25",
    },
    { source: "wikipedia", externalLink: "https://en.wikipedia.org/wiki/Angel_and_the_Badman" },
  ],
  title: "Angel and the Badman",
  genres: ["Western", "Action", "TV Movie"],
  imdbId: "tt1335977",
  posterPath: "/7drO3anh6Opbpt20A3gSeEDUjjP.jpg",
  voteAverage: 5,
  streamingOn: ["fuboTV"],
  createdAt: "2026-10-25T19:46:04.682Z",
  updatedAt: "2026-10-25T19:46:04.682Z",
} as const satisfies Movie
