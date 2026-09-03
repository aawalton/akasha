import type { Movie } from "../movie.page-type.ts"

export const starTrekIntoDarkness = {
  id: "01a06802-6d99-7040-a682-4e1eb61da267",
  pageTypeSlug: "movie",
  slug: "star-trek-into-darkness",
  title: "Star Trek Into Darkness",
  partOfSlugs: ["star-trek-3"],
  position: 18,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2013-05-16",
  externalLink: "https://trakt.tv/movies/star-trek-into-darkness-2013",
  lastSyncedAt: "2025-10-01",
} as const satisfies Movie
