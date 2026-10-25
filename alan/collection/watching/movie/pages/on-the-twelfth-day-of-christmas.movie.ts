import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const onTheTwelfthDayOfChristmas = {
  id: "01a17499-8948-7382-a744-767a00195667",
  type: "page-type/movie",
  slug: "on-the-twelfth-day-of-christmas",
  ownLength: 90,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2015-12-12",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "366631",
      externalLink: "https://www.themoviedb.org/movie/366631",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "On the Twelfth Day of Christmas",
  genres: ["Romance", "TV Movie"],
  imdbId: "tt5210078",
  posterPath: "/cXRhRMJ0PrlU0vfchjmcKS1uypx.jpg",
  voteAverage: 6.4,
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
