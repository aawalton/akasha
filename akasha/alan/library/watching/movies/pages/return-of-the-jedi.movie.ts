import type { Movie } from "../movie.page-type.ts"

export const returnOfTheJedi = {
  id: "01a06802-6d99-702d-9b83-569f384394e3",
  pageTypeSlug: "movie",
  slug: "return-of-the-jedi",
  title: "Return of the Jedi",
  partOfSlugs: ["star-wars-2"],
  position: 3,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "completed",
  publishedAt: "1983-05-25",
  externalLink: "https://trakt.tv/movies/return-of-the-jedi-1983",
  lastSyncedAt: "2025-10-01",
} as const satisfies Movie
