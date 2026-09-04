import type { Movie } from "../movie.page-type.ts"

export const starTrekIiiTheSearchForSpock = {
  id: "01a06802-6d99-703e-803c-8a74b076b334",
  pageTypeSlug: "movie",
  slug: "star-trek-iii-the-search-for-spock",
  title: "Star Trek III: The Search for Spock",
  partOfSlugs: ["star-trek-3"],
  position: 5,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "completed",
  rank: "C",
  publishedAt: "1984-06-01",
  externalLink: "https://trakt.tv/movies/star-trek-iii-the-search-for-spock-1984",
  lastSyncedAt: "2025-10-01",
} as const satisfies Movie
