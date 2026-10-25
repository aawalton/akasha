import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const familyPracticeMysteriesComingHome = {
  id: "01a1749a-a94a-7486-b913-45eb77899c77",
  type: "page-type/movie",
  slug: "family-practice-mysteries-coming-home",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-mystery"],
  publishedAt: "2024-05-17",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1269034",
      externalLink: "https://www.themoviedb.org/movie/1269034",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Family Practice Mysteries: Coming Home",
  genres: ["Mystery"],
  imdbId: "tt32150887",
  posterPath: "/kqPqEtJWT9U4EuOi1N7t26xRZJF.jpg",
  voteAverage: 8.6,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:35.367Z",
  updatedAt: "2026-10-25T19:47:35.367Z",
} as const satisfies Movie
