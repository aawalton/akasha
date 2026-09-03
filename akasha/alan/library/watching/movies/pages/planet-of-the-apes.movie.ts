import type { Movie } from "../movie.page-type.ts"

export const planetOfTheApes = {
  id: "01a06802-6d99-702b-b525-13f353948585",
  pageTypeSlug: "movie",
  slug: "planet-of-the-apes",
  title: "Planet of the Apes",
  partOfSlugs: ["planet-of-the-apes-2"],
  position: 1,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "1968-02-07",
  externalLink: "https://trakt.tv/movies/planet-of-the-apes-1968",
  lastSyncedAt: "2025-10-01",
} as const satisfies Movie
