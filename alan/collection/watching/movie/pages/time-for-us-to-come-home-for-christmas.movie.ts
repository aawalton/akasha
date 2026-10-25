import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const timeForUsToComeHomeForChristmas = {
  id: "01a1749a-259e-7668-bc62-bb13d164180d",
  type: "page-type/movie",
  slug: "time-for-us-to-come-home-for-christmas",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2020-12-05",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "746049",
      externalLink: "https://www.themoviedb.org/movie/746049",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Time for Us to Come Home for Christmas",
  genres: ["TV Movie", "Romance"],
  imdbId: "tt13169850",
  posterPath: "/he6XKUtiiaUE58BZ4DswlcgHwth.jpg",
  voteAverage: 7,
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
