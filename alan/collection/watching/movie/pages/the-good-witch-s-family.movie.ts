import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const theGoodWitchSFamily = {
  id: "01a17499-66a2-7853-9461-bbc5d83dfdd3",
  type: "page-type/movie",
  slug: "the-good-witch-s-family",
  ownLength: 85,
  ownProgress: 0,
  partOfCollections: ["franchise/the-good-witch"],
  position: 3,
  publishedAt: "2011-10-29",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "81033",
      externalLink: "https://www.themoviedb.org/movie/81033",
      lastSyncedAt: "2026-10-25",
    },
    { source: "wikipedia", externalLink: "https://en.wikipedia.org/wiki/The_Good_Witch's_Family" },
  ],
  title: "The Good Witch's Family",
  genres: ["Drama", "Family", "Fantasy", "TV Movie"],
  imdbId: "tt1874757",
  posterPath: "/ywsP21sGXXzui0gk1sVMAZ751Sh.jpg",
  voteAverage: 7.3,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:12.764Z",
  updatedAt: "2026-10-25T19:46:12.764Z",
} as const satisfies Movie
