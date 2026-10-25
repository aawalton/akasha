import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const theChristmasNote = {
  id: "01a17499-8949-7ede-8ef0-5c85ec41452b",
  type: "page-type/movie",
  slug: "the-christmas-note",
  ownLength: 85,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2015-11-29",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "369055",
      externalLink: "https://www.themoviedb.org/movie/369055",
      lastSyncedAt: "2026-10-25",
    },
    { source: "wikipedia", externalLink: "https://en.wikipedia.org/wiki/The_Christmas_Note" },
  ],
  title: "The Christmas Note",
  genres: ["Family", "Mystery", "TV Movie"],
  imdbId: "tt5062804",
  posterPath: "/tmQwchtJhqMHYu1cunBny9BAlhO.jpg",
  voteAverage: 6.3,
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
