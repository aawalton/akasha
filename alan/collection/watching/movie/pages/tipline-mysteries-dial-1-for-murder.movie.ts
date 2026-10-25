import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const tiplineMysteriesDial1ForMurder = {
  id: "01a1749a-a94e-783d-9a69-b70b83d68dcf",
  type: "page-type/movie",
  slug: "tipline-mysteries-dial-1-for-murder",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-mystery"],
  publishedAt: "2024-06-07",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1282948",
      externalLink: "https://www.themoviedb.org/movie/1282948",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Tipline Mysteries: Dial 1 for Murder",
  genres: ["Mystery", "Drama", "TV Movie"],
  imdbId: "tt30786688",
  posterPath: "/kFGxmIhCU99Xc06wfHQrcmMIGzK.jpg",
  voteAverage: 7.2,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "YouTube TV",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:35.367Z",
  updatedAt: "2026-10-25T19:47:35.367Z",
} as const satisfies Movie
