import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const theChristmasPromise = {
  id: "01a1749a-464e-76bd-b40f-5823e2ba8e16",
  type: "page-type/movie",
  slug: "the-christmas-promise",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2021-10-30",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "874147",
      externalLink: "https://www.themoviedb.org/movie/874147",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "The Christmas Promise",
  genres: ["TV Movie", "Romance", "Drama"],
  imdbId: "tt15348352",
  posterPath: "/cXLcwofSyioqmFdgya4utrt0zsd.jpg",
  voteAverage: 5.9,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:10.024Z",
  updatedAt: "2026-10-25T19:47:10.024Z",
} as const satisfies Movie
