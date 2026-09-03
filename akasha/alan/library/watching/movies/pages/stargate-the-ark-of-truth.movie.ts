import type { Movie } from "../movie.page-type.ts"

export const stargateTheArkOfTruth = {
  id: "01a06802-6d9a-7002-a600-9f55cf5ac006",
  pageTypeSlug: "movie",
  slug: "stargate-the-ark-of-truth",
  title: "Stargate: The Ark of Truth",
  partOfSlugs: ["stargate-2"],
  position: 4,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2008-03-11",
  externalLink: "https://trakt.tv/movies/stargate-the-ark-of-truth-2008",
  lastSyncedAt: "2025-10-01",
} as const satisfies Movie
