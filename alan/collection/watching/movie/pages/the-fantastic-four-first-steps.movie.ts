import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const theFantasticFourFirstSteps = {
  id: "01a06802-6d9a-700a-8ea6-1b4a74076506",
  type: "page-type/movie",
  slug: "the-fantastic-four-first-steps",
  title: "The Fantastic Four: First Steps",
  partOfCollections: ["fandom/marvel-cinematic-universe"],
  position: 57,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2025-07-25",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/movies/the-fantastic-4-first-steps-2025",
      lastSyncedAt: "2025-10-01",
    },
  ],
} as const satisfies Movie
