import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const theGoodWitchSCharm = {
  id: "01a17499-66a2-7449-8682-f4fe83483e12",
  type: "page-type/movie",
  slug: "the-good-witch-s-charm",
  ownLength: 90,
  ownProgress: 0,
  partOfCollections: ["franchise/the-good-witch"],
  position: 4,
  publishedAt: "2012-10-27",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "148656",
      externalLink: "https://www.themoviedb.org/movie/148656",
      lastSyncedAt: "2026-10-25",
    },
    { source: "wikipedia", externalLink: "https://en.wikipedia.org/wiki/The_Good_Witch's_Charm" },
  ],
  title: "The Good Witch's Charm",
  genres: ["TV Movie", "Family", "Fantasy"],
  imdbId: "tt2273004",
  posterPath: "/yXdG4mMNqUwurLgOfNzEdDsyyGO.jpg",
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
