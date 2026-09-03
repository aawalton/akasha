import type { Movie } from "../movie.page-type.ts"

export const rogueOne = {
  id: "01a06802-6d99-7031-a726-e734a5930178",
  pageTypeSlug: "movie",
  slug: "rogue-one",
  title: "Rogue One",
  partOfSlugs: ["star-wars-2"],
  position: 11,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "completed",
  publishedAt: "2016-12-16",
  externalLink: "https://trakt.tv/movies/rogue-one-a-star-wars-story-2016",
  lastSyncedAt: "2025-10-01",
} as const satisfies Movie
