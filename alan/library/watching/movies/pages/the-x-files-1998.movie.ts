import type { Movie } from "../movie.page-type.ts"

export const theXFiles1998 = {
  id: "01a06802-6d9a-7020-951c-6789e463beaa",
  pageTypeSlug: "movie",
  slug: "the-x-files-1998",
  title: "The X Files (1998)",
  partOfSlugs: ["x-files"],
  position: 2,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "completed",
  publishedAt: "1998-06-19",
  externalId: "the-x-files-1998",
  externalLink: "https://trakt.tv/movies/the-x-files-1998",
  lastSyncedAt: "2025-12-22",
} as const satisfies Movie
