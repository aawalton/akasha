import type { Movie } from "../movie.page-type.ts"

export const theLordOfTheRingsTheWarOfTheRohirrim = {
  id: "01a06802-6d9a-701a-b500-f43d789bf451",
  pageTypeSlug: "movie",
  slug: "the-lord-of-the-rings-the-war-of-the-rohirrim",
  title: "The Lord of the Rings: The War of the Rohirrim",
  partOfSlugs: ["the-lord-of-the-rings-shows"],
  position: 8,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "completed",
  rank: "B",
  publishedAt: "2024-12-13",
  externalLink: "https://trakt.tv/movies/the-lord-of-the-rings-the-war-of-the-rohirrim-2024",
  lastSyncedAt: "2025-10-01",
} as const satisfies Movie
