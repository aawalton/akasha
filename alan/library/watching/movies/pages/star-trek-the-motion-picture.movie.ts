import type { Movie } from "../movie.page-type.ts"

export const starTrekTheMotionPicture = {
  id: "01a06802-6d99-7044-8561-4ee453e5da9d",
  pageTypeSlug: "movie",
  slug: "star-trek-the-motion-picture",
  title: "Star Trek: The Motion Picture",
  partOfSlugs: ["star-trek-3"],
  position: 3,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "completed",
  rank: "C",
  publishedAt: "1979-12-07",
  externalLink: "https://trakt.tv/movies/star-trek-the-motion-picture-1979",
  lastSyncedAt: "2025-10-01",
} as const satisfies Movie
