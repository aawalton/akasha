import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const angelOfChristmas = {
  id: "01a17499-8943-7481-b6a6-35b31b14aa65",
  type: "page-type/movie",
  slug: "angel-of-christmas",
  ownLength: 90,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2015-11-29",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "363484",
      externalLink: "https://www.themoviedb.org/movie/363484",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Angel of Christmas",
  genres: ["Family", "TV Movie", "Romance"],
  imdbId: "tt5097970",
  posterPath: "/dF1gYqp1I4adhYGFUcp3Cxv0B78.jpg",
  voteAverage: 6.1,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:21.634Z",
  updatedAt: "2026-10-25T19:46:21.634Z",
} as const satisfies Movie
