import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const colorMyWorldWithLove = {
  id: "01a1749a-66bd-73e0-b7d2-e132aecb60e3",
  type: "page-type/movie",
  slug: "color-my-world-with-love",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-mystery"],
  publishedAt: "2022-06-12",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "970932",
      externalLink: "https://www.themoviedb.org/movie/970932",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Color My World With Love",
  genres: ["TV Movie", "Drama", "Romance"],
  imdbId: "tt20223030",
  posterPath: "/rxUzwNbjBi8y7kOlOZ1AUg5LHMG.jpg",
  voteAverage: 6.8,
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
