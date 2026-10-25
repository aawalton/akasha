import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const theConvenientGroom = {
  id: "01a17499-a7d8-7a49-8b4a-2462cda16fd4",
  type: "page-type/movie",
  slug: "the-convenient-groom",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2016-06-18",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "396394",
      externalLink: "https://www.themoviedb.org/movie/396394",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "The Convenient Groom",
  genres: ["TV Movie", "Romance"],
  imdbId: "tt5668196",
  posterPath: "/jT1AQXG3VHcnwyRCWzo85mvVN8P.jpg",
  voteAverage: 5.898,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:29.458Z",
  updatedAt: "2026-10-25T19:46:29.458Z",
} as const satisfies Movie
