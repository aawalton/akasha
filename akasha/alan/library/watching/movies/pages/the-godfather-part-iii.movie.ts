import type { Movie } from "../movie.page-type.ts"

export const theGodfatherPartIii = {
  id: "01a06802-6d9a-700f-9701-75b291a313e1",
  pageTypeSlug: "movie",
  slug: "the-godfather-part-iii",
  title: "The Godfather: Part III",
  partOfSlugs: ["the-godfather-2"],
  position: 3,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "1990-12-25",
  externalLink: "https://trakt.tv/movies/the-godfather-part-iii-1990",
  lastSyncedAt: "2025-09-30",
} as const satisfies Movie
