import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const aMagicalChristmasVillage = {
  id: "01a1749a-4648-7422-a12b-9c0fde86e4b6",
  type: "page-type/movie",
  slug: "a-magical-christmas-village",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2022-11-04",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1026605",
      externalLink: "https://www.themoviedb.org/movie/1026605",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "A Magical Christmas Village",
  genres: ["TV Movie", "Comedy", "Romance"],
  imdbId: "tt22246514",
  posterPath: "/reNCBGdwXnjSUDLFWpHmQFkCOp.jpg",
  voteAverage: 6.3,
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
