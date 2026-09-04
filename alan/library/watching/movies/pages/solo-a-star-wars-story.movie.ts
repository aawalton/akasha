import type { Movie } from "../movie.page-type.ts"

export const soloAStarWarsStory = {
  id: "01a06802-6d99-7035-815d-052f70d6fc36",
  pageTypeSlug: "movie",
  slug: "solo-a-star-wars-story",
  title: "Solo: A Star Wars Story",
  partOfSlugs: ["star-wars-2"],
  position: 13,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "completed",
  publishedAt: "2018-05-25",
  externalLink: "https://trakt.tv/movies/solo-a-star-wars-story-2018",
  lastSyncedAt: "2025-10-01",
} as const satisfies Movie
