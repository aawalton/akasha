import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const roadTripRomance = {
  id: "01a1749a-464d-7d27-bb6f-c47f68b3dd22",
  type: "page-type/movie",
  slug: "road-trip-romance",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2022-05-14",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "958585",
      externalLink: "https://www.themoviedb.org/movie/958585",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Road Trip Romance",
  genres: ["TV Movie", "Romance", "Comedy"],
  imdbId: "tt17023234",
  posterPath: "/4910h7UiRsIISw7WUvq7IwuLs3X.jpg",
  voteAverage: 5.5,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "Plex",
    "Plex Channel",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:10.024Z",
  updatedAt: "2026-10-25T19:47:10.024Z",
} as const satisfies Movie
