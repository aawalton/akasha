import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const harvestLove = {
  id: "01a17499-c95d-762f-9fca-01a04472a416",
  type: "page-type/movie",
  slug: "harvest-love",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2017-09-30",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "475375",
      externalLink: "https://www.themoviedb.org/movie/475375",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Harvest Love",
  genres: ["Romance", "Comedy", "TV Movie"],
  imdbId: "tt2402095",
  posterPath: "/y7feCJdtNmxERcLxWAddB84w9D0.jpg",
  voteAverage: 6.4,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "YouTube TV",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:38.041Z",
  updatedAt: "2026-10-25T19:46:38.041Z",
} as const satisfies Movie
