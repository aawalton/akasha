import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const theGoodWitchSDestiny = {
  id: "01a17499-66a2-73fe-b841-dd1ca72ab4b3",
  type: "page-type/movie",
  slug: "the-good-witch-s-destiny",
  ownLength: 82,
  ownProgress: 0,
  partOfCollections: ["franchise/the-good-witch"],
  position: 5,
  publishedAt: "2013-10-26",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "638186",
      externalLink: "https://www.themoviedb.org/movie/638186",
      lastSyncedAt: "2026-10-25",
    },
    { source: "wikipedia", externalLink: "https://en.wikipedia.org/wiki/The_Good_Witch's_Destiny" },
  ],
  title: "The Good Witch's Destiny",
  genres: ["Drama", "Family", "Fantasy"],
  imdbId: "tt2273024",
  posterPath: "/vLSvMMhVPhDDeFdugnWM7PvTV9x.jpg",
  voteAverage: 7.6,
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
