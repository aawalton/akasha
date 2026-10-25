import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const christmasScavengerHunt = {
  id: "01a17499-e802-7144-98d6-32ac2c466218",
  type: "page-type/movie",
  slug: "christmas-scavenger-hunt",
  ownLength: 80,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2019-11-03",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "627489",
      externalLink: "https://www.themoviedb.org/movie/627489",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Christmas Scavenger Hunt",
  genres: ["Romance", "Drama", "TV Movie"],
  imdbId: "tt10768278",
  posterPath: "/orRDKjEaCdWNtWkEbFubhAPtYAE.jpg",
  voteAverage: 6.2,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:45.888Z",
  updatedAt: "2026-10-25T19:46:45.888Z",
} as const satisfies Movie
