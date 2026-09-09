import type { Movie } from "../movie.page-type.ts"

export const fantasticBeastsTheCrimesOfGrindelwald = {
  id: "01a06802-6d99-700d-b6f0-be8c3f0f8ecf",
  pageTypeSlug: "movie",
  type: "movie",
  slug: "fantastic-beasts-the-crimes-of-grindelwald",
  title: "Fantastic Beasts: The Crimes of Grindelwald",
  partOfCollections: ["fantastic-beasts-movie-series"],
  position: 2,
  ownLength: 0,
  ownProgress: 0,
  unit: "minutes",
  status: "completed",
  rank: "B",
  publishedAt: "2018-11-16",
  externalLink: "https://trakt.tv/movies/fantastic-beasts-the-crimes-of-grindelwald-2018",
  lastSyncedAt: "2025-10-01",
} as const satisfies Movie
