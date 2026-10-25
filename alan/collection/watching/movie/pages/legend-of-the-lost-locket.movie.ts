import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const legendOfTheLostLocket = {
  id: "01a1749a-89a9-750f-8bb2-e7574fc3afa7",
  type: "page-type/movie",
  slug: "legend-of-the-lost-locket",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2024-04-13",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1257356",
      externalLink: "https://www.themoviedb.org/movie/1257356",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Legend of the Lost Locket",
  genres: ["Drama", "Romance", "TV Movie"],
  imdbId: "tt30223844",
  posterPath: "/f1udXkbj1yOBdNBm7suxsg1Ya0Q.jpg",
  voteAverage: 7,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:27.269Z",
  updatedAt: "2026-10-25T19:47:27.269Z",
} as const satisfies Movie
