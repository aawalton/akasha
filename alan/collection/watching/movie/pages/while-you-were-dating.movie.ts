import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const whileYouWereDating = {
  id: "01a17499-a7d9-7d97-b55d-3f4999a07c5e",
  type: "page-type/movie",
  slug: "while-you-were-dating",
  ownLength: 90,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2017-02-12",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "437516",
      externalLink: "https://www.themoviedb.org/movie/437516",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "While You Were Dating",
  genres: ["Romance", "Comedy", "TV Movie"],
  imdbId: "tt6295106",
  posterPath: "/yRN2GzARibB4tE0Y5ilustzQOyc.jpg",
  voteAverage: 5.4,
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
