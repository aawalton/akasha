import type { Movie } from "../movie.page-type.types.ts"

export const beneathThePlanetOfTheApes = {
  id: "01a06802-6d98-7015-9331-6ec11a86b527",
  pageTypeSlug: "movie",
  type: "movie",
  slug: "beneath-the-planet-of-the-apes",
  title: "Beneath the Planet of the Apes",
  partOfCollections: ["planet-of-the-apes-2"],
  position: 2,
  ownLength: 0,
  ownProgress: 0,
  unit: "minutes",
  status: "not-started",
  publishedAt: "1970-05-26",
  externalLink: "https://trakt.tv/movies/beneath-the-planet-of-the-apes-1970",
  lastSyncedAt: "2025-10-01",
} as const satisfies Movie
