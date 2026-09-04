import type { Movie } from "../movie.page-type.ts"

export const warForThePlanetOfTheApes = {
  id: "01a06802-6d9a-7029-a9ff-51b667a43db7",
  pageTypeSlug: "movie",
  slug: "war-for-the-planet-of-the-apes",
  title: "War for the Planet of the Apes",
  partOfSlugs: ["planet-of-the-apes-2"],
  position: 11,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2017-07-14",
  externalLink: "https://trakt.tv/movies/war-for-the-planet-of-the-apes-2017",
  lastSyncedAt: "2025-10-01",
} as const satisfies Movie
