import type { Movie } from "../movie.page-type.types.ts"

export const revengeOfTheSith = {
  id: "01a06802-6d99-702e-b0e0-16a68e153cdf",
  pageTypeSlug: "movie",
  type: "movie",
  slug: "revenge-of-the-sith",
  title: "Revenge of the Sith",
  partOfCollections: ["star-wars-2"],
  position: 7,
  ownLength: 0,
  ownProgress: 0,
  unit: "minutes",
  status: "completed",
  publishedAt: "2005-05-19",
  externalLink: "https://trakt.tv/movies/star-wars-episode-iii-revenge-of-the-sith-2005",
  lastSyncedAt: "2025-10-01",
} as const satisfies Movie
