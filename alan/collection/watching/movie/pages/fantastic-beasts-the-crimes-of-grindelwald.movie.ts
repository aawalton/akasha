import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const fantasticBeastsTheCrimesOfGrindelwald = {
  id: "01a06802-6d99-700d-b6f0-be8c3f0f8ecf",
  type: "page-type/movie",
  slug: "fantastic-beasts-the-crimes-of-grindelwald",
  title: "Fantastic Beasts: The Crimes of Grindelwald",
  partOfCollections: ["show-collection/fantastic-beasts-movie-series"],
  position: 2,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  grade: "B",
  publishedAt: "2018-11-16",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/movies/fantastic-beasts-the-crimes-of-grindelwald-2018",
      lastSyncedAt: "2025-10-01",
    },
  ],
} as const satisfies Movie
