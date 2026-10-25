import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const christmasOnMyMind = {
  id: "01a1749a-06ba-77ca-9069-154e77037507",
  type: "page-type/movie",
  slug: "christmas-on-my-mind",
  ownLength: 90,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2019-12-21",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "630922",
      externalLink: "https://www.themoviedb.org/movie/630922",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Christmas on My Mind",
  genres: ["TV Movie", "Romance"],
  imdbId: "tt11100776",
  posterPath: "/4qF8PmqmLSrqf81Zk2GgXa9knz2.jpg",
  voteAverage: 6.373,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:53.752Z",
  updatedAt: "2026-10-25T19:46:53.752Z",
} as const satisfies Movie
