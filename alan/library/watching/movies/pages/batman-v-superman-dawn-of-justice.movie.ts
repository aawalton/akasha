import type { Movie } from "../movie.page-type.ts"

export const batmanVSupermanDawnOfJustice = {
  id: "01a06802-6d98-7010-8789-495f72a67e9c",
  pageTypeSlug: "movie",
  slug: "batman-v-superman-dawn-of-justice",
  title: "Batman v Superman: Dawn of Justice",
  partOfSlugs: ["dc-extended-universe"],
  position: 2,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2016-03-25",
  externalLink: "https://trakt.tv/movies/batman-v-superman-dawn-of-justice-2016",
  lastSyncedAt: "2025-10-01",
} as const satisfies Movie
