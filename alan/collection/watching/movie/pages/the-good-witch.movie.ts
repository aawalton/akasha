import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const theGoodWitch = {
  id: "01a17497-382a-7813-85fe-d48d72fd4a78",
  type: "page-type/movie",
  slug: "the-good-witch",
  ownLength: 89,
  ownProgress: 0,
  partOfCollections: ["franchise/the-good-witch"],
  position: 0,
  publishedAt: "2008-01-19",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "32790",
      externalLink: "https://www.themoviedb.org/movie/32790",
      lastSyncedAt: "2026-10-25",
    },
    { source: "wikipedia", externalLink: "https://en.wikipedia.org/wiki/The_Good_Witch" },
  ],
  title: "The Good Witch",
  genres: ["Family", "Fantasy", "Drama", "TV Movie"],
  imdbId: "tt1105729",
  posterPath: "/nZVOeGCbhLzIfCOB7BCvIrE2TaY.jpg",
  voteAverage: 7.092,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:43:49.795Z",
  updatedAt: "2026-10-25T19:43:49.795Z",
} as const satisfies Movie
