import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const shiftingGears = {
  id: "01a1749a-89aa-7c44-93db-b350af31d849",
  type: "page-type/movie",
  slug: "shifting-gears",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2024-03-23",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1241980",
      externalLink: "https://www.themoviedb.org/movie/1241980",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Shifting Gears",
  genres: ["Romance"],
  imdbId: "tt31519881",
  posterPath: "/7khTyvtigzx9NWbrGvFb3HjXacD.jpg",
  voteAverage: 6.9,
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
