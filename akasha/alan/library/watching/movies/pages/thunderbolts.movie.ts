import type { Movie } from "../movie.page-type.ts"

export const thunderbolts = {
  id: "01a06802-6d9a-7027-b64e-b240b822f2d8",
  pageTypeSlug: "movie",
  slug: "thunderbolts",
  title: "Thunderbolts*",
  partOfSlugs: ["marvel-cinematic-universe"],
  position: 56,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2025-05-02",
  externalLink: "https://trakt.tv/movies/thunderbolts-2025",
  lastSyncedAt: "2025-10-01",
} as const satisfies Movie
