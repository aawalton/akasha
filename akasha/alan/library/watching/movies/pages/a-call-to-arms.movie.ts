import type { Movie } from "../movie.page-type.ts"

export const aCallToArms = {
  id: "01a06802-6d98-7000-b9ae-02f3ef8b4c25",
  pageTypeSlug: "movie",
  slug: "a-call-to-arms",
  title: "A Call to Arms",
  partOfSlugs: ["babylon-5-2"],
  position: 6,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "1999-01-03",
  externalId: "babylon-5-a-call-to-arms-1999",
  externalLink: "https://trakt.tv/movies/babylon-5-a-call-to-arms-1999",
  lastSyncedAt: "2025-12-20",
} as const satisfies Movie
