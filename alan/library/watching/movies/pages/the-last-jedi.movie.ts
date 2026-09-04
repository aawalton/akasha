import type { Movie } from "../movie.page-type.ts"

export const theLastJedi = {
  id: "01a06802-6d9a-7015-995b-fd0f898496a8",
  pageTypeSlug: "movie",
  slug: "the-last-jedi",
  title: "The Last Jedi",
  partOfSlugs: ["star-wars-2"],
  position: 12,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "completed",
  publishedAt: "2017-12-15",
  externalLink: "https://trakt.tv/movies/star-wars-the-last-jedi-2017",
  lastSyncedAt: "2025-10-01",
} as const satisfies Movie
