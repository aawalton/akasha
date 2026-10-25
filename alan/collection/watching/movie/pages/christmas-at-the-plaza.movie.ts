import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const christmasAtThePlaza = {
  id: "01a1749a-06ba-7cff-89cc-adb67c291a93",
  type: "page-type/movie",
  slug: "christmas-at-the-plaza",
  ownLength: 88,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2019-11-28",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "630916",
      externalLink: "https://www.themoviedb.org/movie/630916",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Christmas at the Plaza",
  genres: ["Romance", "TV Movie"],
  imdbId: "tt10921042",
  posterPath: "/qR7u96cUlmZ7B9jB8Yyv0teszrm.jpg",
  voteAverage: 6.394,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "Pluto TV",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:53.752Z",
  updatedAt: "2026-10-25T19:46:53.752Z",
} as const satisfies Movie
