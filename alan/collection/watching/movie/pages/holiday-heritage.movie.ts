import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const holidayHeritage = {
  id: "01a1749a-66be-729e-86a5-6b9ee16b2dda",
  type: "page-type/movie",
  slug: "holiday-heritage",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2022-12-16",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1028560",
      externalLink: "https://www.themoviedb.org/movie/1028560",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Holiday Heritage",
  genres: ["TV Movie", "Comedy", "Drama", "Family", "Romance"],
  imdbId: "tt22307204",
  posterPath: "/zNhcJycM7qCTw7rz32vH5T5MsM2.jpg",
  voteAverage: 4.1,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:18.330Z",
  updatedAt: "2026-10-25T19:47:18.330Z",
} as const satisfies Movie
