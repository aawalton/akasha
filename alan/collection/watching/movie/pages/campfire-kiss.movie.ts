import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const campfireKiss = {
  id: "01a17499-a7d3-7d7d-beee-3b7d83020ec5",
  type: "page-type/movie",
  slug: "campfire-kiss",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2017-03-18",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "445913",
      externalLink: "https://www.themoviedb.org/movie/445913",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Campfire Kiss",
  genres: ["Comedy", "Romance", "TV Movie"],
  imdbId: "tt6386526",
  posterPath: "/uFwX0kQC8jIzHz9XQo2KOxtgaf1.jpg",
  voteAverage: 6.5,
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
