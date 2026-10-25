import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const youHadMeAtAloha = {
  id: "01a1749a-259e-7384-81c9-d0a54f8d5c35",
  type: "page-type/movie",
  slug: "you-had-me-at-aloha",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2021-06-05",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "809336",
      externalLink: "https://www.themoviedb.org/movie/809336",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "You Had Me at Aloha",
  genres: ["TV Movie", "Comedy", "Romance"],
  imdbId: "tt14695276",
  posterPath: "/5VdBJhCB6w1X05o2C6pPO7eMzjm.jpg",
  voteAverage: 6.8,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:01.655Z",
  updatedAt: "2026-10-25T19:47:01.655Z",
} as const satisfies Movie
