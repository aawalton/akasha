import type { Movie } from "../movie.page-type.ts"

export const starTrekIvTheVoyageHome = {
  id: "01a06802-6d99-7041-bfcd-0d870005132c",
  pageTypeSlug: "movie",
  slug: "star-trek-iv-the-voyage-home",
  title: "Star Trek IV: The Voyage Home",
  partOfSlugs: ["star-trek-3"],
  position: 6,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "completed",
  rank: "C",
  publishedAt: "1986-11-26",
  externalLink: "https://trakt.tv/movies/star-trek-iv-the-voyage-home-1986",
  lastSyncedAt: "2025-10-01",
} as const satisfies Movie
