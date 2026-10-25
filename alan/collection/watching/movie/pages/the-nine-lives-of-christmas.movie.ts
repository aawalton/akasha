import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const theNineLivesOfChristmas = {
  id: "01a17499-8949-753f-82de-1c92d3996d94",
  type: "page-type/movie",
  slug: "the-nine-lives-of-christmas",
  ownLength: 90,
  ownProgress: 0,
  partOfCollections: ["franchise/the-nine-lives-of-christmas"],
  position: 0,
  publishedAt: "2014-11-08",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "299576",
      externalLink: "https://www.themoviedb.org/movie/299576",
      lastSyncedAt: "2026-10-25",
    },
    {
      source: "wikipedia",
      externalLink: "https://en.wikipedia.org/wiki/The_Nine_Lives_of_Christmas",
    },
  ],
  title: "The Nine Lives of Christmas",
  genres: ["TV Movie", "Romance", "Drama", "Comedy"],
  imdbId: "tt3889642",
  posterPath: "/d3Nw4grn02Ca5AmOiRcZLgrAL2k.jpg",
  voteAverage: 6.7,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:21.634Z",
  updatedAt: "2026-10-25T19:46:21.634Z",
} as const satisfies Movie
